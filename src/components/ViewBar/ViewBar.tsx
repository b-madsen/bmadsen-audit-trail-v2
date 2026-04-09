import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useViewBar } from '../../contexts/ViewBarContext';
import './ViewBar.css';

const PERSONAS = [
  { id: 'employee', label: 'Employee' },
  { id: 'manager', label: 'Manager' },
  { id: 'hr-admin', label: 'HR Admin' },
] as const;

const PACKAGES = [
  { id: 'core', label: 'Core' },
  { id: 'pro', label: 'Pro' },
  { id: 'elite', label: 'Elite' },
] as const;

const EDGE_CASES = [
  { id: 'option-one', label: 'Option 1' },
  { id: 'option-two', label: 'Option 2' },
  { id: 'filler', label: 'Option 3' },
] as const;

const ERROR_STATES = [
  { id: 'option-one', label: 'Option 1' },
  { id: 'option-two', label: 'Option 2' },
  { id: 'option-three', label: 'Option 3' },
] as const;

const IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const SHORTCUT = IS_MAC ? '⌘\\' : 'Ctrl+\\';

function ButtonGroup<T extends string>({
  items,
  activeId,
  onSelect,
  sliderColor = '#2e7918',
}: {
  items: readonly { id: T; label: string }[];
  activeId: T;
  onSelect: (id: T) => void;
  sliderColor?: string;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const positionedRef = useRef(false);

  useLayoutEffect(() => {
    const activeIdx = items.findIndex(item => item.id === activeId);
    const btn = btnRefs.current[activeIdx];
    const group = groupRef.current;
    const slider = sliderRef.current;
    if (!btn || !group || !slider) return;

    const groupRect = group.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - groupRect.left;
    const width = btnRect.width;

    if (!positionedRef.current) {
      slider.style.transition = 'none';
      slider.style.left = `${left}px`;
      slider.style.width = `${width}px`;
      void slider.offsetWidth;
      slider.style.transition = '';
      positionedRef.current = true;
    } else {
      slider.style.left = `${left}px`;
      slider.style.width = `${width}px`;
    }
  }, [activeId, items]);

  return (
    <div className="view-bar__group" ref={groupRef}>
      <div ref={sliderRef} className="view-bar__slider" style={{ background: sliderColor }} />
      {items.map(({ id, label }, i) => (
        <button
          key={id}
          type="button"
          ref={el => { btnRefs.current[i] = el; }}
          className={`view-bar__btn${activeId === id ? ' view-bar__btn--active' : ''}`}
          onClick={() => onSelect(id)}
          aria-pressed={activeId === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function InfoPanel({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={panelRef} className="view-bar__info-panel">
      <div className="view-bar__info-title">Prototype Toolbar</div>
      <p className="view-bar__info-intro">
        This bar lets you preview the prototype through different lenses — no account switching needed.
        Click any button to change the simulated context.
      </p>

      <ul className="view-bar__info-list">
        <li>
          <strong>Persona</strong> — Simulates the app from a specific user's perspective.
          Switching roles changes what menus, permissions, and features are visible.
        </li>
        <li>
          <strong>Package</strong> — Previews which features are available at each plan tier:
          Core, Pro, or Elite.
        </li>
        <li>
          <strong>Edge Cases</strong> — Placeholder scenarios for edge case testing.
          Replace the option labels with your own use cases.
        </li>
        <li>
          <strong>Error States</strong> — Simulate broken or failed states in your prototype.
          Customize the labels for the specific error scenarios you're testing.
        </li>
      </ul>

      <div className="view-bar__info-tip">
        <span className="view-bar__info-tip-key">{SHORTCUT}</span>
        Show or hide this toolbar
      </div>
    </div>
  );
}

function ToggleGroup({
  items,
  activeId,
  onToggle,
  activeColor,
}: {
  items: readonly { id: string; label: string }[];
  activeId: string | null;
  onToggle: (id: string) => void;
  activeColor: string;
}) {
  return (
    <div className="view-bar__toggle-group">
      {items.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            className={`view-bar__btn view-bar__toggle-btn${isActive ? ' view-bar__btn--active' : ''}`}
            style={isActive ? { background: activeColor, color: '#fff' } : undefined}
            onClick={() => onToggle(id)}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function EdgeHint() {
  const { isVisible } = useViewBar();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(false);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | null = null;

    function handleMouseMove(e: MouseEvent) {
      if (e.clientY < 20) {
        if (!timer) {
          timer = setTimeout(() => setShow(true), 3000);
        }
      } else if (e.clientY > 56) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        setShow(false);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  if (isVisible) return null;

  return (
    <div className={`view-bar__edge-hint${show ? ' view-bar__edge-hint--visible' : ''}`}>
      Press {SHORTCUT} to show prototype tools
    </div>
  );
}

export function ViewBar() {
  const {
    isVisible,
    activePersona, setActivePersona,
    activePackage, setActivePackage,
    activeEdgeCase, toggleEdgeCase,
    activeErrorState, toggleErrorState,
  } = useViewBar();

  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
    <EdgeHint />
    <div className={`view-bar${isVisible ? ' view-bar--visible' : ''}`} role="toolbar" aria-label="View settings">
      <span className="view-bar__label">Persona</span>
      <ButtonGroup items={PERSONAS} activeId={activePersona} onSelect={setActivePersona} />

      <div className="view-bar__divider" aria-hidden="true" />

      <span className="view-bar__label">Package</span>
      <ButtonGroup items={PACKAGES} activeId={activePackage} onSelect={setActivePackage} />

      <div className="view-bar__divider" aria-hidden="true" />

      <span className="view-bar__label">Edge Cases</span>
      <ToggleGroup items={EDGE_CASES} activeId={activeEdgeCase} onToggle={toggleEdgeCase} activeColor="#b45309" />

      <div className="view-bar__divider" aria-hidden="true" />

      <span className="view-bar__label">Error States</span>
      <ToggleGroup items={ERROR_STATES} activeId={activeErrorState} onToggle={toggleErrorState} activeColor="#b91c1c" />

      <div className="view-bar__info-anchor">
        <button
          type="button"
          className={`view-bar__info-btn${infoOpen ? ' view-bar__info-btn--open' : ''}`}
          onClick={() => setInfoOpen(prev => !prev)}
          aria-label="How to use this toolbar"
          aria-expanded={infoOpen}
        >
          ?
        </button>
        {infoOpen && <InfoPanel onClose={() => setInfoOpen(false)} />}
      </div>
    </div>
    </>
  );
}
