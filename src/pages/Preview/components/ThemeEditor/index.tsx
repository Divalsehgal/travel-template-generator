import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CloseIcon from '@mui/icons-material/Close';

import type { Project } from '../../../../types/project';

interface ThemeTokens {
    name: string;
    prop: string;
    defaultVal: string;
    type: 'color' | 'text' | 'shadow';
}

const TECHNO_TOKENS: ThemeTokens[] = [
    { name: 'Accent Color', prop: '--theme-techno-accent', defaultVal: '#ccff00', type: 'color' },
    { name: 'Background Primary', prop: '--theme-techno-bg', defaultVal: '#050505', type: 'color' },
    { name: 'Background Secondary', prop: '--theme-techno-bg-secondary', defaultVal: '#1a1a1a', type: 'color' },
    { name: 'Background Dark', prop: '--theme-techno-bg-dark', defaultVal: '#000000', type: 'color' },
    { name: 'Text Primary', prop: '--theme-techno-text', defaultVal: '#ffffff', type: 'color' },
    { name: 'Text Dim', prop: '--theme-techno-text-dim', defaultVal: '#888888', type: 'color' },
    { name: 'Box Shadow', prop: '--theme-techno-shadow', defaultVal: '6px 6px 0px #ccff00', type: 'shadow' },
    { name: 'Border Radius', prop: '--theme-techno-radius', defaultVal: '0px', type: 'text' },
];

const WAVY_TOKENS: ThemeTokens[] = [
    { name: 'Accent Color', prop: '--theme-wavy-accent', defaultVal: '#ff6b00', type: 'color' },
    { name: 'Secondary Color', prop: '--theme-wavy-secondary', defaultVal: '#00d2ff', type: 'color' },
    { name: 'Background Color', prop: '--theme-wavy-bg', defaultVal: '#000000', type: 'color' },
    { name: 'Border Radius', prop: '--theme-wavy-radius', defaultVal: '1rem', type: 'text' },
];

const WAVY_PALETTES = [
    { name: 'Sunset', accent: '#ff6b00', secondary: '#ff0055', bg: '#000000' },
    { name: 'Ocean', accent: '#00d2ff', secondary: '#3a7bd5', bg: '#000000' },
    { name: 'Forest', accent: '#00ff87', secondary: '#60efff', bg: '#0b1612' },
    { name: 'Cyber', accent: '#f000ff', secondary: '#00ff87', bg: '#000000' },
];

const MODERN_TOKENS: ThemeTokens[] = [
    { name: 'Primary Accent', prop: '--theme-primary', defaultVal: '#2D3A2F', type: 'color' },
    { name: 'Secondary Accent', prop: '--theme-secondary', defaultVal: '#F4D3D3', type: 'color' },
    { name: 'Tertiary Accent', prop: '--theme-tertiary', defaultVal: '#A7B8A8', type: 'color' },
    { name: 'Muted Text', prop: '--theme-muted', defaultVal: '#E5E7EB', type: 'color' },
    { name: 'Background Color', prop: '--theme-bg', defaultVal: '#F9FAFB', type: 'color' },
    { name: 'Border Radius', prop: '--theme-radius', defaultVal: '0px', type: 'text' },
];

interface ThemeEditorProps {
    project: Project;
    onSave?: (updates: Partial<Project>) => Promise<void>;
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ project, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [values, setValues] = useState<Record<string, string>>({});

    const activeTokens = project.shortTemplate === 'wavy' 
        ? WAVY_TOKENS 
        : project.shortTemplate === 'modern'
            ? MODERN_TOKENS
            : TECHNO_TOKENS;

    // Read initial values from project or fall back to defaults
    useEffect(() => {
        const initial: Record<string, string> = { ...project.shortThemeVariables };
        activeTokens.forEach(t => {
            if (initial[t.prop] === undefined) {
                initial[t.prop] = t.defaultVal;
            }
        });
        setValues(initial);
    }, [activeTokens, project.shortThemeVariables]);

    // 1. Manage hidden style tag in head
    useEffect(() => {
        const styleId = 'theme-editor-styles';
        let styleTag = document.getElementById(styleId) as HTMLStyleElement;
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }

        const cssVariables = Object.entries(values)
            .map(([prop, val]) => `  ${prop}: ${val} !important;`)
            .join('\n');

        styleTag.textContent = `:root {\n${cssVariables}\n}`;

        return () => {
            // Clean up on unmount or when template changes (if we want to reset)
            // For now keep it to maintain preview
        };
    }, [values]);

    if (!isOpen) {
        return (
            <button className={styles['theme-btn']} onClick={() => setIsOpen(true)} title="Theme Settings">
                <ColorLensIcon />
            </button>
        );
    }

    const handleChange = (prop: string, val: string) => {
        setValues(prev => ({ ...prev, [prop]: val }));
    };

    const handleReset = () => {
        const resetVals: Record<string, string> = {};
        activeTokens.forEach(t => {
            resetVals[t.prop] = t.defaultVal;
        });
        setValues(resetVals);
    };

    const handleSave = async () => {
        if (!onSave) return;
        setIsSaving(true);
        try {
            await onSave({
                shortThemeVariables: values,
            });
        } catch (error) {
            console.error('Failed to save theme:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles['theme-editor']}>
            <div className={styles['theme-editor__header']}>
                <h3>Theme Variables</h3>
                <button className={styles['theme-editor__close']} onClick={() => setIsOpen(false)}>
                    <CloseIcon fontSize="small" />
                </button>
            </div>

            <div className={styles['theme-editor__content']}>
                {project.shortTemplate === 'wavy' && (
                    <div className={styles['theme-editor__palettes']}>
                        <label>Presets</label>
                        <div className={styles['theme-editor__palette-list']}>
                            {WAVY_PALETTES.map(p => (
                                <button 
                                    key={p.name} 
                                    onClick={() => {
                                        handleChange('--theme-wavy-accent', p.accent);
                                        handleChange('--theme-wavy-secondary', p.secondary);
                                        handleChange('--theme-wavy-bg', p.bg);
                                    }}
                                    className={styles['theme-editor__palette-btn']}
                                    style={{ background: `linear-gradient(45deg, ${p.accent}, ${p.secondary})` }}
                                    title={p.name}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {activeTokens.map(t => {
                    if (t.type === 'color') {
                        return (
                            <div key={t.prop} className={styles['theme-editor__group']}>
                                <label>{t.name}</label>
                                <div className={styles['theme-editor__input-row']}>
                                    <input
                                        type="color"
                                        value={values[t.prop] || t.defaultVal}
                                        onChange={(e) => handleChange(t.prop, e.target.value)}
                                    />
                                    <span className={styles['theme-editor__hex']}>{values[t.prop] || t.defaultVal}</span>
                                </div>
                            </div>
                        );
                    }

                    if (t.type === 'shadow') {
                        // Parse values from string: '6px 6px 0px #ccff00'
                        const currentVal = values[t.prop] || t.defaultVal;
                        const match = currentVal.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(#?[a-zA-Z0-9]+)/);

                        const x = match ? parseInt(match[1]) : 6;
                        const y = match ? parseInt(match[2]) : 6;
                        const blur = match ? parseInt(match[3]) : 0;
                        const color = match ? match[4] : '#ccff00';

                        const handleShadowChange = (newX: number, newY: number, newBlur: number, newColor: string) => {
                            handleChange(t.prop, `${newX}px ${newY}px ${newBlur}px ${newColor}`);
                        };

                        return (
                            <div key={t.prop} className={styles['theme-editor__group']}>
                                <label>{t.name}</label>
                                <div className={styles['theme-editor__shadow-builder']}>
                                    <div className={styles['theme-editor__shadow-row']}>
                                        <span>X</span>
                                        <input
                                            type="range" min="-20" max="20" value={x}
                                            onChange={(e) => handleShadowChange(parseInt(e.target.value), y, blur, color)}
                                        />
                                        <span className={styles['shadow-val']}>{x}px</span>
                                    </div>
                                    <div className={styles['theme-editor__shadow-row']}>
                                        <span>Y</span>
                                        <input
                                            type="range" min="-20" max="20" value={y}
                                            onChange={(e) => handleShadowChange(x, parseInt(e.target.value), blur, color)}
                                        />
                                        <span className={styles['shadow-val']}>{y}px</span>
                                    </div>
                                    <div className={styles['theme-editor__shadow-row']}>
                                        <span>BLUR</span>
                                        <input
                                            type="range" min="0" max="40" value={blur}
                                            onChange={(e) => handleShadowChange(x, y, parseInt(e.target.value), color)}
                                        />
                                        <span className={styles['shadow-val']}>{blur}px</span>
                                    </div>
                                    <div className={styles['theme-editor__input-row']}>
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => handleShadowChange(x, y, blur, e.target.value)}
                                        />
                                        <span className={styles['theme-editor__hex']}>{color}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={t.prop} className={styles['theme-editor__group']}>
                            <label>{t.name}</label>
                            <div className={styles['theme-editor__input-row']}>
                                <input
                                    type="text"
                                    className={styles['theme-editor__text-input']}
                                    value={values[t.prop] || t.defaultVal}
                                    onChange={(e) => handleChange(t.prop, e.target.value)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles['theme-editor__footer']}>
                <button onClick={handleReset} className={styles['theme-editor__reset']}>
                    Reset Tokens
                </button>
                <button 
                    onClick={handleSave} 
                    className={styles['theme-editor__save']}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save to Project'}
                </button>
            </div>
        </div>
    );
};

export default ThemeEditor;
