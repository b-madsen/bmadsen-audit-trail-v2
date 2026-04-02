# Figma Component Properties → Fabric Props Mapping

When `/launch` encounters Figma component variants, use this mapping to determine Fabric props.

## Standard Button
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Default / Primary / Secondary | `type="default"` / `type="primary"` / `type="secondary"` |
| Size | Small / Medium / Large | `size="small"` / `size="medium"` / `size="large"` |
| State | Default / Hover / Active / Focused / Disabled | `disabled={true}` (for Disabled) |
| Theme | Light / Dark | `theme="dark"` (if on dark background) |
| Is dropdown | true / false | Include dropdown caret indicator |
| Has icon | true / false | `startIcon="icon-name"` |

## Text Button
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Primary / Secondary | `type="primary"` / `type="secondary"` (secondary = muted) |
| Size | Small / Medium / Large | `size="small"` / `size="medium"` / `size="large"` |
| Usage | Inline / Standalone | Inline: within text. Standalone: on its own. |
| Theme | Light / Dark | `theme="dark"` |

## Icon Button
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Default / Primary / Secondary | `type` prop |
| Size | X-small / Small / Medium / Large | `size` prop |
| Treatment | Default / Floating / No bounding box | Visual treatment variant |

## Tabs
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Filled / Lined | `mode="fill"` / `mode="line"` |
| Theme | Light / Dark | `theme="dark"` (filled only) |
| Size | Medium / Large | `size="medium"` / `size="large"` |
| Note: Large tabs support description text; Medium tabs do not.

## Checkbox
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Size | Medium (Default) / Large | `size="medium"` / `size="large"` |
| State | Inactive / Active / Indeterminate / + Error/Warning variants | `checked`, `indeterminate`, `status` props |
| Is required | true / false | `required={true}` |
| Is disabled | true / false | `disabled={true}` |
| Has note | true / false | `note="..."` |

## Radio Button
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Has note | true / false | `note="..."` on individual Radio |
| RULE: Always provide a default selected value.

## TextField
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Text / Currency / Date | Use `TextField`, `CurrencyField`, or `DateField` |
| State | Default / Focused / Disabled / Warning / Error / Info / View | `status` prop, `disabled` prop, `readOnly` for View |

## Select Field
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Size | Medium / Small | `size="medium"` / `size="small"` |
| Is clearable | true / false | `isClearable={true}` |

## Chip
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Is removable | true / false | `onRemove` handler |
| Status | Neutral / Brand / Success / Warning / Error / Info / Discovery | `status` prop |
| Has icon | true / false | `icon="icon-name"` |

## Pill
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Brand / Info / Success / Warning / Error / Neutral / Discovery / Inverted | `type` prop |
| Style | Standard / Muted | `muted={true}` for muted |
| Has icon | true / false | `icon="icon-name"` |

## Badge v2
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Person / Icon | Avatar-based vs icon-based |
| Size | Small / Medium / Large | `size` prop |
| Has subtitle | true / false | `subtitle="..."` |

## Modal
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Size | Small (608px) / Medium (800px) / Full-screen | `size` prop |
| Has standard headline | true / false | `<StandardHeadline>` child |
| Has hero headline | true / false | `<HeroHeadline>` child |
| RULE: Small/medium → buttons right-aligned, primary rightmost. Full-screen → buttons left-aligned, primary leftmost. Cancel → TextButton.

## Sheet (Sub-modal)
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Size | Small (528px) / Medium (720px) / Large (912px) | `size` prop |

## Section
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Header size | Small / Medium / Large | `headerSize` prop |
| Has header | true / false | Include `header` prop |
| Has icon | true / false | `icon` prop |
| Has description | true / false | `description` prop |
| Has actions | true / false | `actions` prop (always small buttons) |
| Has divider | true / false | `divider` prop |

## Page Header V2
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Layout | Single row / Double row | Single: title + buttons. Double: adds tabs/filters row. |
| Headline | X-Large / Large (Payroll only) | Default to X-Large unless Payroll context |

## Blank State
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Level | Page / Widget | `level` prop |
| Has actions | true / false | Action buttons |
| Has supporting text | true / false | `description` prop |

## Action Footer
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Style | Default / Dark | Dark theme for external pages (ATS, Offer Letters) |
| Has right content | true / false | `rightContent` prop |

## Accordion
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type Variant | Default / Card | `variant="card"` |
| RULE: Default to all panels collapsed. Never open all by default.

## Avatar
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Size | 24/32/40/48/56/64/72/80/96/128/160/224 | `size` prop (use preset values only) |
| Type | Photo / Placeholder | Automatic based on whether `src` is provided |

## Tile V2
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Orientation | Vertical / Horizontal | `orientation` prop |
| Title size | Small / Medium / Large | `titleSize` prop |
| Has description | true / false | `description` prop |

## Action Tile
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Orientation | Vertical / Horizontal | `orientation` prop |
| Title size | Small / Medium / Large | `titleSize` prop |
| State | Idle / Hover / Focused | Handled automatically |

## Banner
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Informational / Trial / Caution / Critical | `type` prop |
| Is dismissable | true / false | `isDismissable` prop |
| Has right content | true / false | Right-side actions |

## Inline Message
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Status | Information / Success / Error / Warning / Discovery | `status` prop |
| Theme | Default / Light | `theme="light"` for dark backgrounds |
| Has action | true / false | `action` prop |

## Selectable Box
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Mode | Radio / Checkbox | `mode="radio"` / `mode="checkbox"` |

## Calendar View
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Months to show | 1 / 2 | `monthsToShow` prop |
| Day states: default, today, highlight (range), prominent (event), today+prominent |

## File Uploader
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Mode | Single / Multiple | `multiple` prop |
| Supports drag-and-drop automatically |

## Wizards
| Figma Property | Figma Values | Fabric Prop |
|---------------|-------------|-------------|
| Type | Vertical / Horizontal | `<VerticalWizard>` / `<HorizontalWizard>` |
| Vertical: navigable sidebar. Horizontal: step indicators at top.
