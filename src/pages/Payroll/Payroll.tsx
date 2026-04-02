import { useState, useRef, useEffect } from 'react';
import { IconV2, Headline } from '@bamboohr/fabric';
import {
  payrollDates,
  payrollStats,
  reminders as initialReminders,
  payrollDetails,
  payrollTitle,
  dueDate,
  payrollId,
  updatesText,
} from '../../data/payrollData';
import type { Reminder } from '../../data/payrollData';
import './Payroll.css';

const CARD_WIDTH = 160;
const MIN_GAP = 20;
const BUTTON_WIDTH = 40;

export function Payroll() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [visibleCardCount, setVisibleCardCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateVisibleCards = () => {
      const containerWidth = container.offsetWidth;
      const availableWidth = containerWidth - BUTTON_WIDTH - MIN_GAP;
      const maxCards = Math.floor((availableWidth + MIN_GAP) / (CARD_WIDTH + MIN_GAP));
      const count = Math.max(1, Math.min(maxCards, payrollDates.length));
      setVisibleCardCount(count);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleCards);
    resizeObserver.observe(container);
    calculateVisibleCards();

    return () => resizeObserver.disconnect();
  }, []);

  const visibleDates = payrollDates.slice(0, visibleCardCount);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  return (
    <div className="payroll-page">
      {/* Header */}
      <div className="payroll-header">
        <Headline size="large">Payroll</Headline>
        <div className="payroll-header-actions">
          <button className="payroll-button payroll-button--secondary">
            Open TRAXPayroll
          </button>
          <button className="payroll-button payroll-button--outlined">
            <span>+</span>
            New off-cycle payroll
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="payroll-dates" ref={containerRef}>
        <div className="payroll-dates-line" />
        <div className="payroll-dates-container">
          <div className="payroll-dates-cards">
            {visibleDates.map((date) => (
              <button
                key={date.id}
                className={`payroll-date-card ${date.isSelected ? 'payroll-date-card--selected' : 'payroll-date-card--unselected'}`}
              >
                <div className="payroll-date-day-container">
                  {date.badge && (
                    <div className="payroll-date-badge">{date.badge}</div>
                  )}
                  <div className={`payroll-date-day-box ${date.isSelected ? 'payroll-date-day-box--selected' : 'payroll-date-day-box--unselected'}`}>
                    <span className={`payroll-date-day ${date.isSelected ? 'payroll-date-day--selected' : 'payroll-date-day--unselected'}`}>
                      {date.day}
                    </span>
                  </div>
                </div>
                <div className="payroll-date-info">
                  <span className={`payroll-date-month ${date.isSelected ? 'payroll-date-month--selected' : 'payroll-date-month--unselected'}`}>
                    {date.month}
                  </span>
                  <span className="payroll-date-weekday">{date.dayOfWeek}</span>
                </div>
              </button>
            ))}
          </div>
          <button className="payroll-arrow-button">
            <IconV2 name="chevron-right-solid" size={16} color="primary-strong" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="payroll-content">
        {/* Left Column */}
        <div className="payroll-main">
          <div className="payroll-card">
            {/* Payroll Title */}
            <div className="payroll-card-header">
              <div className="payroll-card-icon">
                <IconV2 name="circle-dollar-solid" size={24} color="primary-strong" />
              </div>
              <h2 className="payroll-card-title">{payrollTitle}</h2>
            </div>

            {/* Stats Row */}
            <div className="payroll-stats">
              {payrollStats.map((stat) => (
                <div key={stat.id} className="payroll-stat-card">
                  <div className="payroll-stat-icon">
                    <IconV2 name={`${stat.icon}-solid`} size={24} color="primary-strong" />
                  </div>
                  <div className="payroll-stat-info">
                    <p className="payroll-stat-value">{stat.value}</p>
                    <p className="payroll-stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reminders Section */}
            <div className="payroll-reminders">
              <div className="payroll-section-header">
                <IconV2 name="gear-solid" size={20} color="primary-strong" />
                <h3 className="payroll-section-title">Reminders</h3>
              </div>
              <div className="payroll-reminders-list">
                {reminders.map((reminder) => (
                  <label key={reminder.id} className="payroll-reminder">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => toggleReminder(reminder.id)}
                      className="payroll-reminder-checkbox"
                    />
                    <span className={`payroll-reminder-text ${reminder.completed ? 'payroll-reminder-text--completed' : ''}`}>
                      {reminder.text}
                    </span>
                  </label>
                ))}
              </div>
              <button className="payroll-add-reminder">+ Add Reminder</button>
            </div>

            {/* Updates Section */}
            <div>
              <div className="payroll-updates-header">
                <IconV2 name="arrows-rotate-solid" size={24} color="primary-strong" />
                <h3 className="payroll-updates-title">Updates since last payroll</h3>
              </div>
              <p className="payroll-updates-text">{updatesText}</p>
              <button className="payroll-button payroll-button--secondary payroll-jump-button">
                <IconV2 name="link-solid" size={16} color="neutral-strong" />
                Jump to report
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="payroll-sidebar">
          <div className="payroll-sidebar-card">
            <button className="payroll-button payroll-button--primary">
              Start payroll
            </button>
            <p className="payroll-due-date">
              <IconV2 name="bell-solid" size={12} color="neutral-medium" />
              {dueDate}
            </p>

            {/* Payroll Details */}
            <div className="payroll-details">
              {payrollDetails.map((detail) => (
                <div key={detail.id} className="payroll-detail-item">
                  <div className="payroll-detail-icon">
                    <IconV2 name={`${detail.icon}-solid`} size={16} color="neutral-strong" />
                  </div>
                  <div className="payroll-detail-info">
                    <p className="payroll-detail-value">{detail.value}</p>
                    <p className="payroll-detail-label">{detail.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="payroll-button payroll-button--secondary payroll-delete-button">
              Delete this payroll
            </button>

            <p className="payroll-id">{payrollId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
