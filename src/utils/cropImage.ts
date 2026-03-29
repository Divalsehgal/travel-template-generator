/**
 * This function was inspired by the react-easy-crop documentation
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

/**
 * Pads an image with a specified percentage of its own dimensions.
 * Useful for providing "breathing room" around a logo before cropping.
 */
export const padImage = async (imageSrc: string, paddingPercent: number = 10): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return imageSrc

    const paddingX = image.width * (paddingPercent / 100)
    const paddingY = image.height * (paddingPercent / 100)

    canvas.width = image.width + paddingX * 2
    canvas.height = image.height + paddingY * 2

    // Clear background before drawing to ensure transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw original image centered
    ctx.drawImage(image, paddingX, paddingY)

    return canvas.toDataURL('image/png')
}


export function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation)

    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
}

/**
 * This function was adapted from the react-easy-crop documentation
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0,
    flip = { horizontal: false, vertical: false },
    format: string = 'image/png',
    quality: number = 0.8,
    maxWidth: number = 1200
): Promise<string | null> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    )

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central point to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')
    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
        return null
    }

    // Determine output size (apply maxWidth)
    let outputWidth = pixelCrop.width
    let outputHeight = pixelCrop.height

    if (outputWidth > maxWidth) {
        const ratio = maxWidth / outputWidth
        outputWidth = maxWidth
        outputHeight = Math.round(outputHeight * ratio)
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = outputWidth
    croppedCanvas.height = outputHeight

    // Clear background before drawing
    croppedCtx.clearRect(0, 0, outputWidth, outputHeight);

    // Draw the cropped image onto the new canvas (with resizing if necessary)
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
    )

    // As Base64 string
    return croppedCanvas.toDataURL(format, quality);
}
