import { useState, useCallback, useRef, useEffect } from 'react';
import { Headline, BodyText, Avatar, Button, InlineMessage, IconV2, IconButton, StyledBox, ActionTile } from '@bamboohr/fabric';
import { AIChatPrompt } from './components/AIChatPrompt';
import { TeamHealthCard } from './components/TeamHealthCard';
import { WhoIsOutCard } from './components/WhoIsOutCard';
import { QuickActionsCard } from './components/QuickActionsCard';
import { PriorityAlertsCard } from './components/PriorityAlertsCard';
import { AllUpdatesTable } from './components/feed/AllUpdatesTable';
import {
  LowEngagementCard,
  QuarterComparisonCard,
  DepartmentInsightsCard,
  CoverageGapsCard,
  TrainingComplianceCard,
  AtRiskEmployeesCard,
  AIMessageCard,
  BirthdayMessageStackCard,
  ExitInterviewTrendsCard,
  SurveyCommentsCard,
  PayrollDeadlinesCard,
  CompletedGoalsCard,
  OverdueReviewsCard,
  EmployeesNeedingFeedbackCard,
  FutureAbsencesCard,
  WorkAnniversariesCard,
  UpcomingCelebrationsCard,
  PendingTimeOffCard,
  Scheduled1on1sCard,
  IndustryBenchmarksCard,
  YearOverYearTrendsCard,
  EngineeringTeamFocusCard,
  BackupCoverageCard,
  WorkloadDistributionCard,
  OverdueItemsCard,
  AutomationSetupCard,
  TrainingByCategoryCard,
  TrainingCompletionRatesCard,
  RootCauseAnalysisCard,
  UpcomingBirthdaysCard,
  AutoSendSetupCard,
  RecognitionEventCard,
  PastMilestonesCard,
  MilestoneAchievementsCard,
  SurveyBySentimentCard,
  GrowthProgramsCard,
  PromotionRatesCard,
  FeedbackTemplatesCard,
  NewHireUpdatesCard,
  WeeklyUpdatesCard,
  ActionableItemsCard,
  PtoPolicyCard,
  PendingTimesheetsCard,
  BonusCalculationsCard,
  BenefitEnrollmentsCard,
  ReviewCalendarCard,
  RetentionMeetingsCard,
  NewEmployeeSummaryCard,
} from './components/insights';
import type { NewEmployeeInfo } from './components/insights';
import {
  teamHealthMetrics,
  todayAbsences,
  weekAbsences,
  quickActions,
  priorityAlerts,
  feedItems,
  departmentMetrics,
  quarterlyMetrics,
  trainingRecords,
  coverageGaps,
  payrollDeadlines,
  exitInterviewTrends,
  surveyComments,
  lowEngagementEmployees,
  atRiskEmployees,
  employeesNeedingFeedback,
  nextMonthAbsences,
  workAnniversariesThisMonth,
  completedGoalsThisMonth,
  overdueReviews,
  aiGeneratedMessages,
  sampleEmployees,
  upcomingCelebrations,
  pendingTimeOffRequests,
} from '../../data/mockHRManagerData';
import './HRManagerHome.css';

type WidgetType =
  | 'teamHealth'
  | 'whoIsOut'
  | 'quickActions'
  | 'priorityAlerts'
  | 'feed'
  | 'lowEngagement'
  | 'quarterComparison'
  | 'departmentInsights'
  | 'coverageGaps'
  | 'trainingCompliance'
  | 'atRiskEmployees'
  | 'aiMessage'
  | 'exitInterviewTrends'
  | 'surveyComments'
  | 'payrollDeadlines'
  | 'completedGoals'
  | 'overdueReviews'
  | 'employeesNeedingFeedback'
  | 'futureAbsences'
  | 'workAnniversaries'
  | 'upcomingCelebrations'
  | 'pendingTimeOff'
  | 'scheduled1on1s'
  | 'industryBenchmarks'
  | 'yearOverYearTrends'
  | 'engineeringTeamFocus'
  | 'backupCoverage'
  | 'workloadDistribution'
  | 'overdueItems'
  | 'automationSetup'
  | 'trainingByCategory'
  | 'trainingCompletionRates'
  | 'retentionMeetings'
  | 'rootCauseAnalysis'
  | 'milestoneAchievements'
  | 'upcomingBirthdays'
  | 'autoSendSetup'
  | 'recognitionEvent'
  | 'pastMilestones'
  | 'surveyBySentiment'
  | 'growthPrograms'
  | 'promotionRates'
  | 'feedbackTemplates'
  | 'newHireUpdates'
  | 'weeklyUpdates'
  | 'actionableItems'
  | 'ptoPolicy'
  | 'pendingTimesheets'
  | 'bonusCalculations'
  | 'benefitEnrollments'
  | 'reviewCalendar'
  | 'birthdayMessageStack'
  | 'newEmployeeSummary';

interface AIResponse {
  message: string;
  widgets: WidgetType[];
  suggestions?: string[];
}

interface ChatMessage {
  id: number;
  query: string;
  response: AIResponse;
  timestamp: Date;
}

// Simulated LLM query processing
function processQuery(query: string): AIResponse {
  const q = query.toLowerCase();

  // === FOLLOW-UP QUERIES ===

  // Low engagement follow-up
  if (q.includes('low engagement') || q.includes('who has low')) {
    return {
      message: `I found ${lowEngagementEmployees.length} employees with engagement scores below 70%. These team members may need additional support or check-ins.`,
      widgets: ['lowEngagement'],
      suggestions: [
        'Schedule 1:1s with at-risk employees',
        'What is causing low engagement?',
        'Compare to industry benchmarks'
      ]
    };
  }

  // Quarter comparison follow-up
  if (q.includes('compare') && (q.includes('quarter') || q.includes('last'))) {
    const current = quarterlyMetrics[quarterlyMetrics.length - 1];
    const previous = quarterlyMetrics[quarterlyMetrics.length - 2];
    const change = current.engagementScore - previous.engagementScore;
    return {
      message: `Comparing ${current.quarter} ${current.year} to ${previous.quarter} ${previous.year}: Engagement is ${change > 0 ? 'up' : 'down'} ${Math.abs(change)} points. Overall trends are positive.`,
      widgets: ['quarterComparison'],
      suggestions: [
        'What drove the improvement?',
        'Show department breakdown',
        'View year-over-year trends'
      ]
    };
  }

  // Department insights follow-up
  if (q.includes('department') && (q.includes('attention') || q.includes('need') || q.includes('compare'))) {
    const needsAttention = departmentMetrics.filter(d => d.engagementScore < 75 || d.turnoverRisk !== 'low');
    return {
      message: `${needsAttention.length} departments need attention. Engineering and Design show the lowest engagement scores and highest turnover risk.`,
      widgets: ['departmentInsights'],
      suggestions: [
        'Focus on Engineering team',
        'Schedule department reviews',
        'View historical trends'
      ]
    };
  }

  // Coverage gaps follow-up
  if (q.includes('coverage') || q.includes('gap') || q.includes('conflict')) {
    const criticalGaps = coverageGaps.filter(g => g.gapSeverity === 'critical');
    return {
      message: `I identified ${coverageGaps.length} potential coverage gaps this week, including ${criticalGaps.length} critical gap${criticalGaps.length !== 1 ? 's' : ''} that need immediate attention.`,
      widgets: ['coverageGaps'],
      suggestions: [
        'Find backup coverage',
        'Adjust time-off requests',
        'View by department'
      ]
    };
  }

  // Training compliance follow-up
  if (q.includes('training') || q.includes('overdue training') || q.includes('compliance deadline')) {
    const overdueCount = trainingRecords.filter(r => r.status === 'overdue').length;
    return {
      message: `There are ${overdueCount} overdue training assignments that require immediate attention. Most are compliance-related courses.`,
      widgets: ['trainingCompliance'],
      suggestions: [
        'Send reminder emails',
        'View by category',
        'Check completion rates'
      ]
    };
  }

  // At-risk employees follow-up
  if (q.includes('at risk') || q.includes('risk of leaving') || (q.includes('who') && q.includes('leaving'))) {
    return {
      message: `${atRiskEmployees.length} employees are flagged as high turnover risk based on engagement scores, satisfaction levels, and activity patterns.`,
      widgets: ['atRiskEmployees'],
      suggestions: [
        'View talking points',
        'Schedule retention meetings',
        'Analyze root causes'
      ]
    };
  }

  // Birthday message follow-up
  if (q.includes('draft') && q.includes('birthday')) {
    return {
      message: `I've drafted personalized birthday messages for 3 upcoming birthdays: Marcus Chen (Feb 8), Charlotte Abbott (Feb 12), and James Wilson (Feb 15). Work through each card to send your messages.`,
      widgets: ['birthdayMessageStack'],
      suggestions: [
        'View all upcoming birthdays',
        'Set up auto-send',
        'Customize message templates'
      ]
    };
  }

  // Work anniversaries follow-up
  if (q.includes('work anniversar') || (q.includes('anniversar') && q.includes('month'))) {
    return {
      message: `There are ${workAnniversariesThisMonth.length} work anniversaries this month, including two 5-year milestones worth special recognition.`,
      widgets: ['workAnniversaries'],
      suggestions: [
        'Generate celebration messages',
        'Plan recognition event',
        'View past milestones'
      ]
    };
  }

  // Completed goals follow-up
  if (q.includes('completed goal') || (q.includes('who') && q.includes('goal') && q.includes('month'))) {
    return {
      message: `${completedGoalsThisMonth.length} employees completed their goals this month. Consider recognizing their achievements!`,
      widgets: ['completedGoals'],
      suggestions: [
        'Send recognition',
        'Set new goals',
        'View team progress'
      ]
    };
  }

  // Overdue reviews follow-up
  if (q.includes('overdue') && q.includes('review')) {
    return {
      message: `There are ${overdueReviews.length} performance reviews past their due date. The oldest is 23 days overdue.`,
      widgets: ['overdueReviews'],
      suggestions: [
        'Schedule review sessions',
        'Send manager reminders',
        'View review calendar'
      ]
    };
  }

  // Employees needing feedback follow-up
  if (q.includes('need') && q.includes('feedback')) {
    return {
      message: `${employeesNeedingFeedback.length} employees haven't received feedback in over 60 days. Regular feedback improves engagement by 14%.`,
      widgets: ['employeesNeedingFeedback'],
      suggestions: [
        'Schedule check-ins',
        'View feedback templates',
        'Set up reminders'
      ]
    };
  }

  // Next month absences follow-up
  if (q.includes('next month') || (q.includes('who') && q.includes('out') && q.includes('march'))) {
    return {
      message: `There are ${nextMonthAbsences.length} planned absences for next month, including 1 parental leave starting March 20.`,
      widgets: ['futureAbsences'],
      suggestions: [
        'Check coverage gaps',
        'View by department',
        'Plan workload distribution'
      ]
    };
  }

  // Payroll deadlines follow-up
  if (q.includes('payroll') && q.includes('deadline')) {
    const dueToday = payrollDeadlines.filter(d => d.status === 'due-today');
    return {
      message: `You have ${payrollDeadlines.length} upcoming payroll deadlines. ${dueToday.length > 0 ? `${dueToday.length} are due today!` : 'None are due today.'}`,
      widgets: ['payrollDeadlines'],
      suggestions: [
        'View pending timesheets',
        'Check bonus calculations',
        'Review benefit enrollments'
      ]
    };
  }

  // Survey comments follow-up
  if (q.includes('survey') && q.includes('comment')) {
    const negativeCount = surveyComments.filter(c => c.sentiment === 'negative').length;
    return {
      message: `I found ${surveyComments.length} recent survey comments, including ${negativeCount} that express concerns worth addressing.`,
      widgets: ['surveyComments'],
      suggestions: [
        'Respond to concerns',
        'View by sentiment',
        'Analyze trends'
      ]
    };
  }

  // Exit interview trends follow-up
  if (q.includes('exit interview') || q.includes('why') && q.includes('leaving')) {
    return {
      message: `Based on exit interviews, "Career Growth" is the #1 reason for departures at 32%, and it's trending upward. This suggests an opportunity to improve internal mobility.`,
      widgets: ['exitInterviewTrends'],
      suggestions: [
        'Create growth programs',
        'Review promotion rates',
        'Compare to industry'
      ]
    };
  }

  // What is driving low engagement
  if (q.includes('driving') && q.includes('engagement')) {
    return {
      message: `Survey data indicates limited career growth opportunities and infrequent feedback are the top drivers of low engagement. Engineering and Design departments are most affected.`,
      widgets: ['surveyComments', 'departmentInsights'],
      suggestions: [
        'View specific comments',
        'Plan growth initiatives',
        'Schedule skip-level meetings'
      ]
    };
  }

  // Priority/urgent follow-up
  if (q.includes('most urgent') || q.includes('prioritize first')) {
    return {
      message: `Top priorities: 1) ${trainingRecords.filter(r => r.status === 'overdue').length} overdue compliance trainings, 2) ${payrollDeadlines.filter(d => d.status === 'due-today').length} payroll tasks due today, 3) ${coverageGaps.filter(g => g.gapSeverity === 'critical').length} critical coverage gaps.`,
      widgets: ['trainingCompliance', 'payrollDeadlines', 'coverageGaps'],
      suggestions: [
        'Address compliance first',
        'Delegate to team leads',
        'Set up automation'
      ]
    };
  }

  // Retention conversation follow-up
  if (q.includes('retention') && q.includes('conversation')) {
    return {
      message: `I've identified ${atRiskEmployees.length} employees who would benefit from retention conversations. I've prepared talking points based on their engagement data and feedback history.`,
      widgets: ['atRiskEmployees'],
      suggestions: [
        'View talking points',
        'Schedule meetings',
        'Review compensation data'
      ]
    };
  }

  // === LEVEL 2 & 3 FOLLOW-UPS ===

  // Schedule 1:1s follow-up (from low engagement)
  if (q.includes('schedule') && q.includes('1:1') || q.includes('schedule') && q.includes('1-on-1') || q.includes('schedule 1:1')) {
    return {
      message: `I've prepared a list of recommended 1:1 meetings with at-risk employees. These are prioritized by engagement score and days since last check-in.`,
      widgets: ['scheduled1on1s'],
      suggestions: [
        'Send calendar invites',
        'View meeting templates',
        'Set recurring schedule'
      ]
    };
  }

  // Industry benchmarks follow-up
  if (q.includes('industry') && q.includes('benchmark')) {
    return {
      message: `Your team's engagement score of ${teamHealthMetrics.engagementScore}% is 3 points above the industry average of 69%. However, turnover risk is slightly higher than the benchmark.`,
      widgets: ['industryBenchmarks'],
      suggestions: [
        'How can we improve further?',
        'View competitor analysis',
        'Set improvement targets'
      ]
    };
  }

  // Year over year trends
  if (q.includes('year') && (q.includes('trend') || q.includes('over'))) {
    return {
      message: `Year-over-year analysis shows engagement improved by 8% compared to last year. Q4 showed the strongest gains after implementing the feedback program.`,
      widgets: ['yearOverYearTrends'],
      suggestions: [
        'What changed in Q4?',
        'Project next year trends',
        'Set annual goals'
      ]
    };
  }

  // What drove improvement
  if (q.includes('drove') && q.includes('improvement') || q.includes('what changed')) {
    return {
      message: `Key drivers of improvement: 1) Monthly feedback sessions increased by 45%, 2) Manager training completed by 90% of leads, 3) New recognition program launched in October.`,
      widgets: ['quarterComparison'],
      suggestions: [
        'Expand successful programs',
        'View recognition stats',
        'Plan next initiatives'
      ]
    };
  }

  // Focus on Engineering team
  if (q.includes('engineering') && (q.includes('team') || q.includes('focus'))) {
    return {
      message: `Engineering department analysis: Engagement at 62% (lowest), 3 employees flagged as flight risks. Primary concerns are career growth and work-life balance based on survey responses.`,
      widgets: ['engineeringTeamFocus'],
      suggestions: [
        'Schedule Engineering all-hands',
        'Review promotion pipeline',
        'Address workload concerns'
      ]
    };
  }

  // Schedule department reviews
  if (q.includes('schedule') && q.includes('department') && q.includes('review')) {
    return {
      message: `I recommend scheduling quarterly department reviews. Based on current metrics, prioritize Engineering and Design first, then Sales and Marketing.`,
      widgets: ['departmentInsights'],
      suggestions: [
        'Create review agenda',
        'Set up recurring meetings',
        'Assign review owners'
      ]
    };
  }

  // Historical trends
  if (q.includes('historical') && q.includes('trend')) {
    return {
      message: `12-month historical analysis shows steady improvement in engagement (+12%) and satisfaction (+8%). Turnover risk has decreased from high to medium over this period.`,
      widgets: ['yearOverYearTrends'],
      suggestions: [
        'Export trend report',
        'Compare to company goals',
        'Identify seasonal patterns'
      ]
    };
  }

  // Find backup coverage
  if (q.includes('backup') && q.includes('coverage') || q.includes('find') && q.includes('coverage')) {
    return {
      message: `I've identified potential backup coverage options for the critical gaps. 3 team members have capacity and matching skills to provide coverage.`,
      widgets: ['backupCoverage'],
      suggestions: [
        'Assign backup roles',
        'Notify team members',
        'Create coverage schedule'
      ]
    };
  }

  // Adjust time-off requests
  if (q.includes('adjust') && (q.includes('time-off') || q.includes('time off') || q.includes('request'))) {
    return {
      message: `To resolve coverage gaps, I suggest adjusting 2 overlapping time-off requests. I can help you draft messages to the affected employees with alternative date options.`,
      widgets: ['pendingTimeOff'],
      suggestions: [
        'Draft adjustment messages',
        'View alternative dates',
        'Set coverage requirements'
      ]
    };
  }

  // Show pending time-off requests (specific follow-up)
  if ((q.includes('pending') || q.includes('show')) && (q.includes('time-off') || q.includes('time off'))) {
    return {
      message: `You have ${pendingTimeOffRequests.length} pending time-off requests to review. I've checked for scheduling conflicts and highlighted any concerns.`,
      widgets: ['pendingTimeOff'],
      suggestions: [
        'Approve all requests',
        'Check for coverage gaps',
        'View by department'
      ]
    };
  }

  // Plan workload distribution
  if (q.includes('workload') && q.includes('distribution') || q.includes('plan workload')) {
    return {
      message: `Based on upcoming absences, I recommend redistributing tasks across 5 team members. Current workload analysis shows 2 employees have capacity for additional work.`,
      widgets: ['workloadDistribution'],
      suggestions: [
        'View capacity details',
        'Assign redistributed tasks',
        'Set workload alerts'
      ]
    };
  }

  // Overdue items
  if (q.includes('overdue') && q.includes('item')) {
    return {
      message: `You have 12 overdue items across categories: 4 training assignments, 3 performance reviews, 3 time-off approvals, and 2 document submissions.`,
      widgets: ['overdueItems'],
      suggestions: [
        'Address training first',
        'Bulk approve time-off',
        'Delegate to managers'
      ]
    };
  }

  // Address compliance first
  if (q.includes('address') && q.includes('compliance')) {
    return {
      message: `Compliance priority list: 1) 4 overdue safety trainings (deadline passed), 2) 2 harassment prevention courses due this week, 3) Annual certifications expiring next month.`,
      widgets: ['trainingCompliance'],
      suggestions: [
        'Send urgent reminders',
        'Escalate to managers',
        'Schedule makeup sessions'
      ]
    };
  }

  // Delegate to team leads
  if (q.includes('delegate') && (q.includes('team') || q.includes('lead') || q.includes('manager'))) {
    return {
      message: `I can help delegate tasks to your 4 team leads. Based on their current workload, I recommend assigning review follow-ups to Sarah and training reminders to Michael.`,
      widgets: ['workloadDistribution'],
      suggestions: [
        'Confirm delegation',
        'Notify team leads',
        'Set follow-up reminders'
      ]
    };
  }

  // Set up automation
  if (q.includes('set up') && q.includes('automation') || q.includes('automate')) {
    return {
      message: `Available automations: 1) Auto-approve routine time-off, 2) Send training reminders 7 days before due, 3) Weekly digest of pending items, 4) Birthday/anniversary notifications.`,
      widgets: ['automationSetup'],
      suggestions: [
        'Enable all automations',
        'Customize rules',
        'View automation history'
      ]
    };
  }

  // Send reminder emails (training)
  if (q.includes('send') && q.includes('reminder')) {
    return {
      message: `I can send personalized reminder emails to 6 employees with overdue or upcoming training. Preview the messages before sending to ensure they match your tone.`,
      widgets: ['trainingCompliance'],
      suggestions: [
        'Preview all messages',
        'Send immediately',
        'Schedule for tomorrow'
      ]
    };
  }

  // Training by category
  if (q.includes('by category') || (q.includes('view') && q.includes('category'))) {
    return {
      message: `Training breakdown by category: Compliance (8 pending, 4 overdue), Safety (5 pending, 2 overdue), Professional Development (12 pending, 0 overdue), Onboarding (3 pending, 0 overdue).`,
      widgets: ['trainingByCategory'],
      suggestions: [
        'Focus on compliance',
        'Assign professional development',
        'Review onboarding progress'
      ]
    };
  }

  // Training completion rates
  if (q.includes('completion') && q.includes('rate')) {
    return {
      message: `Overall training completion rate is 78%. By department: HR (95%), Sales (82%), Marketing (80%), Engineering (65%), Design (58%). Engineering and Design need attention.`,
      widgets: ['trainingCompletionRates'],
      suggestions: [
        'Improve Engineering rates',
        'Recognize top completers',
        'Analyze barriers'
      ]
    };
  }

  // View talking points
  if (q.includes('talking point')) {
    return {
      message: `I've prepared personalized talking points for retention conversations with each at-risk employee, based on their survey responses, engagement data, and recent activity.`,
      widgets: ['atRiskEmployees'],
      suggestions: [
        'Print talking points',
        'Schedule the meetings',
        'Add custom notes'
      ]
    };
  }

  // Schedule retention meetings
  if (q.includes('schedule') && (q.includes('retention') || q.includes('meeting'))) {
    return {
      message: `I recommend scheduling retention conversations within the next 2 weeks. I can find optimal times based on both your calendar and each employee's availability.`,
      widgets: ['retentionMeetings'],
      suggestions: [
        'Find available times',
        'Send calendar invites',
        'Prepare meeting agendas'
      ]
    };
  }

  // Analyze root causes
  if (q.includes('root cause') || (q.includes('analyze') && q.includes('cause'))) {
    return {
      message: `Root cause analysis for turnover risk: 45% cite limited growth opportunities, 30% mention compensation concerns, 15% report work-life balance issues, 10% have manager relationship challenges.`,
      widgets: ['rootCauseAnalysis'],
      suggestions: [
        'Address growth opportunities',
        'Review compensation',
        'Improve manager training'
      ]
    };
  }

  // Review compensation data
  if (q.includes('compensation') && (q.includes('data') || q.includes('review'))) {
    return {
      message: `Compensation analysis for at-risk employees: 2 are below market rate (15-20%), 1 hasn't had a raise in 18 months, 2 are at market rate but peers were recently promoted.`,
      widgets: ['atRiskEmployees'],
      suggestions: [
        'Prepare adjustment proposals',
        'Review budget allocation',
        'Compare to market data'
      ]
    };
  }

  // Generate for another employee (birthday/celebration messages)
  if (q.includes('generate') && q.includes('another') || q.includes('another employee')) {
    return {
      message: `Select an employee to generate a personalized message. I've listed all team members with upcoming celebrations in the next 30 days.`,
      widgets: ['upcomingCelebrations'],
      suggestions: [
        'Generate all messages',
        'Customize message style',
        'Schedule delivery'
      ]
    };
  }

  // View all upcoming birthdays
  if (q.includes('all') && q.includes('birthday') || q.includes('upcoming birthday')) {
    return {
      message: `There are 6 birthdays in the next 30 days. The next one is Marcus Chen on February 8th. Would you like me to prepare celebration messages for all of them?`,
      widgets: ['upcomingBirthdays'],
      suggestions: [
        'Generate all messages',
        'Plan team celebration',
        'Set up auto-send'
      ]
    };
  }

  // Set up auto-send
  if (q.includes('auto-send') || q.includes('auto send')) {
    return {
      message: `Auto-send configuration: I can automatically send birthday and anniversary messages on your behalf. Choose your preferred channel (email/Slack) and customize the default message templates.`,
      widgets: ['autoSendSetup'],
      suggestions: [
        'Enable for birthdays',
        'Enable for anniversaries',
        'Customize templates'
      ]
    };
  }

  // Generate celebration messages
  if (q.includes('generate') && (q.includes('celebration') || q.includes('message'))) {
    return {
      message: `I've drafted personalized celebration messages for all upcoming work anniversaries. Each message highlights their contributions and milestones during their tenure.`,
      widgets: ['aiMessage'],
      suggestions: [
        'Review all messages',
        'Send via email',
        'Send via Slack'
      ]
    };
  }

  // Plan recognition event
  if (q.includes('plan') && q.includes('recognition') || q.includes('recognition event')) {
    return {
      message: `Planning a recognition event: 5 employees have significant milestones this quarter (3 five-year anniversaries, 2 major goal completions). I suggest a team gathering on the 15th.`,
      widgets: ['recognitionEvent'],
      suggestions: [
        'Book venue/meeting room',
        'Create awards',
        'Send invitations'
      ]
    };
  }

  // View past milestones
  if (q.includes('past') && q.includes('milestone')) {
    return {
      message: `Past 12 months milestones: 12 work anniversaries celebrated, 8 promotions, 24 major goals completed, 5 certifications earned. Recognition rate improved by 35%.`,
      widgets: ['pastMilestones'],
      suggestions: [
        'Export milestone report',
        'Compare to last year',
        'Identify recognition gaps'
      ]
    };
  }

  // Show milestone achievements
  if (q.includes('milestone') && q.includes('achievement')) {
    return {
      message: `Recent milestone achievements: Sarah completed her leadership certification, Michael hit his 5-year anniversary, and the Engineering team exceeded their Q4 delivery goals.`,
      widgets: ['milestoneAchievements'],
      suggestions: [
        'Send congratulations',
        'Add to newsletter',
        'Plan celebration'
      ]
    };
  }

  // Respond to concerns (survey)
  if (q.includes('respond') && q.includes('concern')) {
    return {
      message: `I've identified 4 survey comments requiring direct response. I can help draft thoughtful replies that acknowledge concerns and outline action plans.`,
      widgets: ['surveyComments'],
      suggestions: [
        'Draft responses',
        'Schedule follow-ups',
        'Create action items'
      ]
    };
  }

  // View by sentiment
  if (q.includes('by sentiment') || q.includes('sentiment')) {
    return {
      message: `Survey sentiment breakdown: 45% positive, 35% neutral, 20% negative. Negative comments primarily focus on career growth (40%) and communication (35%).`,
      widgets: ['surveyBySentiment'],
      suggestions: [
        'Address negative feedback',
        'Amplify positive themes',
        'Identify improvement areas'
      ]
    };
  }

  // Analyze survey trends
  if (q.includes('analyze') && q.includes('trend') || q.includes('survey') && q.includes('trend')) {
    return {
      message: `Survey trend analysis: Positive sentiment increased 8% this quarter. Top improving areas: manager relationships (+12%), team collaboration (+10%). Declining: workload balance (-5%).`,
      widgets: ['surveyBySentiment'],
      suggestions: [
        'Investigate workload concerns',
        'Continue manager training',
        'Survey follow-up'
      ]
    };
  }

  // Create growth programs
  if (q.includes('growth') && q.includes('program') || q.includes('create') && q.includes('program')) {
    return {
      message: `Recommended growth programs based on exit interview data: 1) Mentorship pairing (addresses 32% of departures), 2) Skills development tracks, 3) Internal mobility postings, 4) Leadership pipeline.`,
      widgets: ['growthPrograms'],
      suggestions: [
        'Launch mentorship program',
        'Create development tracks',
        'Set up job shadowing'
      ]
    };
  }

  // Review promotion rates
  if (q.includes('promotion') && q.includes('rate')) {
    return {
      message: `Promotion rate analysis: 12% of employees promoted in the last year (industry avg: 15%). Engineering has the lowest rate at 8%. Average time to promotion: 2.3 years.`,
      widgets: ['promotionRates'],
      suggestions: [
        'Identify promotion candidates',
        'Review criteria',
        'Set promotion goals'
      ]
    };
  }

  // Compare to industry (exit interviews)
  if (q.includes('compare') && q.includes('industry')) {
    return {
      message: `Industry comparison: Your voluntary turnover (12%) is below industry average (15%). However, "career growth" as exit reason (32%) is above average (25%), indicating opportunity for improvement.`,
      widgets: ['industryBenchmarks'],
      suggestions: [
        'Benchmark compensation',
        'Review growth programs',
        'Analyze by department'
      ]
    };
  }

  // View feedback templates
  if (q.includes('feedback') && q.includes('template')) {
    return {
      message: `Available feedback templates: 1) Weekly check-in, 2) Performance discussion, 3) Goal setting, 4) Development conversation, 5) Recognition moment. Each includes AI-suggested talking points.`,
      widgets: ['feedbackTemplates'],
      suggestions: [
        'Use weekly check-in',
        'Customize templates',
        'Create new template'
      ]
    };
  }

  // Set up feedback reminders
  if (q.includes('feedback') && q.includes('reminder') || q.includes('set up') && q.includes('reminder')) {
    return {
      message: `Feedback reminder settings: I can notify you when employees haven't received feedback in 30, 45, or 60 days. Currently, reminders are set for 60 days.`,
      widgets: ['automationSetup'],
      suggestions: [
        'Change to 30 days',
        'Add manager notifications',
        'View reminder history'
      ]
    };
  }

  // Schedule check-ins
  if (q.includes('schedule') && q.includes('check-in')) {
    return {
      message: `I recommend scheduling check-ins with the 6 employees who haven't received feedback recently. I can find 30-minute slots that work for both parties.`,
      widgets: ['scheduled1on1s'],
      suggestions: [
        'Auto-schedule all',
        'View calendar availability',
        'Send meeting requests'
      ]
    };
  }

  // Show only items needing action
  if (q.includes('needing action') || q.includes('actionable')) {
    return {
      message: `You have 8 items requiring immediate action: 3 time-off approvals, 2 expense reports, 2 document reviews, and 1 hiring decision.`,
      widgets: ['actionableItems'],
      suggestions: [
        'Approve time-off requests',
        'Review expenses',
        'Complete hiring decision'
      ]
    };
  }

  // What happened this week
  if (q.includes('this week') || q.includes('happened') && q.includes('week')) {
    return {
      message: `This week's highlights: 2 goals completed, 1 new hire started, 3 training courses finished, 1 promotion announced. 2 items need your attention.`,
      widgets: ['weeklyUpdates'],
      suggestions: [
        'View new hire details',
        'Congratulate promotee',
        'Address pending items'
      ]
    };
  }

  // Any new hire updates
  if (q.includes('new hire') || q.includes('onboarding')) {
    return {
      message: `New hire update: Alex Kim started Monday in Engineering. Onboarding progress: 60% complete. Remaining items: security training, team introductions, first project assignment.`,
      widgets: ['newHireUpdates'],
      suggestions: [
        'View onboarding checklist',
        'Schedule intro meeting',
        'Assign buddy'
      ]
    };
  }

  // PTO policy
  if (q.includes('pto policy') || q.includes('policy')) {
    return {
      message: `PTO Policy Summary: Full-time employees receive 15 days annually (accrued monthly). Unused days roll over up to 5 days. Requests require 2 weeks notice for 3+ consecutive days.`,
      widgets: ['ptoPolicy'],
      suggestions: [
        'View full policy',
        'Check employee balances',
        'Update policy'
      ]
    };
  }

  // View pending timesheets
  if (q.includes('timesheet')) {
    return {
      message: `Pending timesheets: 8 employees haven't submitted this week's timesheet. Deadline is Friday 5pm. I can send reminder notifications to all pending employees.`,
      widgets: ['pendingTimesheets'],
      suggestions: [
        'Send reminders',
        'View by department',
        'Extend deadline'
      ]
    };
  }

  // Check bonus calculations
  if (q.includes('bonus') && q.includes('calculation')) {
    return {
      message: `Q4 bonus calculations ready for review: 24 eligible employees, total pool $145,000. Based on performance ratings: 8 at 120%, 12 at 100%, 4 at 80%.`,
      widgets: ['bonusCalculations'],
      suggestions: [
        'Review individual amounts',
        'Adjust calculations',
        'Approve and process'
      ]
    };
  }

  // Review benefit enrollments
  if (q.includes('benefit') && q.includes('enrollment')) {
    return {
      message: `Open enrollment status: 85% of employees have completed elections. 12 employees pending (deadline in 5 days). Most popular change: upgrading to premium health plan.`,
      widgets: ['benefitEnrollments'],
      suggestions: [
        'Remind pending employees',
        'View election summary',
        'Process enrollments'
      ]
    };
  }

  // Schedule review sessions
  if (q.includes('schedule') && q.includes('review') && q.includes('session')) {
    return {
      message: `I can help schedule the 5 overdue performance review sessions. Based on calendar analysis, next week has the most availability for both managers and employees.`,
      widgets: ['reviewCalendar'],
      suggestions: [
        'Auto-schedule all',
        'Send calendar invites',
        'Prepare review materials'
      ]
    };
  }

  // Send manager reminders
  if (q.includes('manager') && q.includes('reminder')) {
    return {
      message: `Manager reminder: 3 managers have overdue reviews for their direct reports. I can send personalized reminders with deadlines and helpful resources.`,
      widgets: ['overdueReviews'],
      suggestions: [
        'Send reminders now',
        'Schedule follow-up',
        'View manager workloads'
      ]
    };
  }

  // View review calendar
  if (q.includes('review') && q.includes('calendar')) {
    return {
      message: `Review calendar: 5 reviews overdue, 8 scheduled this month, 15 due next month. Peak review season is approaching - consider distributing workload.`,
      widgets: ['reviewCalendar'],
      suggestions: [
        'Reschedule overdue',
        'Balance workload',
        'Set calendar reminders'
      ]
    };
  }

  // Send recognition
  if (q.includes('send') && q.includes('recognition')) {
    return {
      message: `Recognition options for goal achievers: 1) Personal thank you message, 2) Public shout-out in team channel, 3) Spot bonus nomination, 4) Newsletter feature.`,
      widgets: ['completedGoals'],
      suggestions: [
        'Send personal messages',
        'Post to team channel',
        'Nominate for bonus'
      ]
    };
  }

  // Set new goals
  if (q.includes('set') && q.includes('new') && q.includes('goal')) {
    return {
      message: `Goal setting recommendations: Based on completed goals and team objectives, I suggest setting Q1 goals focused on: skill development (3 employees), project delivery (4 employees), leadership growth (2 employees).`,
      widgets: ['completedGoals'],
      suggestions: [
        'Create goal templates',
        'Schedule goal sessions',
        'Align with company OKRs'
      ]
    };
  }

  // View team progress
  if (q.includes('team') && q.includes('progress')) {
    return {
      message: `Team goal progress: 72% overall completion rate. On track: 18 goals, At risk: 4 goals, Completed: 12 goals. Engineering leads with 85% completion.`,
      widgets: ['completedGoals'],
      suggestions: [
        'Address at-risk goals',
        'Recognize top performers',
        'Adjust timelines'
      ]
    };
  }

  // === MAIN QUERIES ===

  // Team health related queries
  if (q.includes('team') && (q.includes('doing') || q.includes('health') || q.includes('how'))) {
    return {
      message: `Based on your team data, engagement is at ${teamHealthMetrics.engagementScore}% with a ${teamHealthMetrics.engagementTrend} trend. Satisfaction is at ${teamHealthMetrics.satisfactionScore}%. I've surfaced your Team Health dashboard below.`,
      widgets: ['teamHealth'],
      suggestions: [
        'Who has low engagement scores?',
        'Compare to last quarter',
        'Which departments need attention?'
      ]
    };
  }

  // Absence related queries
  if (q.includes('out') || q.includes('absent') || q.includes('off') || q.includes('vacation') || q.includes('sick') || q.includes('leave')) {
    const outCount = todayAbsences.length;
    const weekCount = weekAbsences.length;
    return {
      message: `There ${outCount === 1 ? 'is' : 'are'} ${outCount} team member${outCount === 1 ? '' : 's'} out today and ${weekCount} more planned this week. I've pulled up the absence calendar for you.`,
      widgets: ['whoIsOut'],
      suggestions: [
        'Any coverage gaps this week?',
        'Show pending time-off requests',
        'Who is out next month?'
      ]
    };
  }

  // Action/task related queries
  if (q.includes('do') || q.includes('action') || q.includes('task') || q.includes('can i') || q.includes('should i')) {
    return {
      message: `Here are the actions you can take right now. I've identified ${priorityAlerts.length} items that need your attention.`,
      widgets: ['quickActions', 'priorityAlerts'],
      suggestions: [
        'What should I prioritize first?',
        'Are there any overdue items?',
        'Show me compliance deadlines'
      ]
    };
  }

  // Attention/priority related queries
  if (q.includes('attention') || q.includes('urgent') || q.includes('priority') || q.includes('important') || q.includes('pending')) {
    return {
      message: `You have ${priorityAlerts.length} priority items requiring attention. I recommend addressing the compliance items first.`,
      widgets: ['priorityAlerts'],
      suggestions: [
        'What is the most urgent?',
        'Show overdue training',
        'Any payroll deadlines coming up?'
      ]
    };
  }

  // Performance related queries
  if (q.includes('performance') || q.includes('review') || q.includes('goal')) {
    const perfItems = feedItems.filter(item => item.type === 'performance' || item.type === 'goal');
    return {
      message: `I found ${perfItems.length} performance-related updates. Your team has been making progress on their goals.`,
      widgets: ['feed'],
      suggestions: [
        'Who completed goals this month?',
        'Any reviews overdue?',
        'Show employees needing feedback'
      ]
    };
  }

  // Celebration related queries
  if (q.includes('birthday') || q.includes('anniversary') || q.includes('celebration') || q.includes('celebrate')) {
    const birthdayCount = upcomingCelebrations.filter(c => c.type === 'birthday').length;
    const anniversaryCount = upcomingCelebrations.filter(c => c.type === 'work-anniversary').length;
    return {
      message: `You have ${upcomingCelebrations.length} upcoming celebrations: ${birthdayCount} birthday${birthdayCount !== 1 ? 's' : ''} and ${anniversaryCount} work anniversary${anniversaryCount !== 1 ? 'ies' : ''}. Use the AI-powered "Send Note" button to generate personalized messages.`,
      widgets: ['upcomingCelebrations'],
      suggestions: [
        'Draft a birthday message',
        'Who has work anniversaries this month?',
        'Show milestone achievements'
      ]
    };
  }

  // Time off request queries
  if (q.includes('time off') || q.includes('pto') || q.includes('request') || q.includes('approve') || q.includes('pending')) {
    return {
      message: `You have ${pendingTimeOffRequests.length} pending time-off request${pendingTimeOffRequests.length === 1 ? '' : 's'} to review. I've checked for scheduling conflicts and found no issues.`,
      widgets: ['pendingTimeOff'],
      suggestions: [
        'Any coverage gaps this week?',
        'Who is out next month?',
        'What is our PTO policy?'
      ]
    };
  }

  // Updates/feed related queries
  if (q.includes('update') || q.includes('happening') || q.includes('news') || q.includes('what\'s new')) {
    return {
      message: `Here's everything happening with your team. I've organized the updates by type for easy review.`,
      widgets: ['feed'],
      suggestions: [
        'Show only items needing action',
        'What happened this week?',
        'Any new hire updates?'
      ]
    };
  }

  // Engagement specific
  if (q.includes('engagement') || q.includes('morale') || q.includes('satisfaction')) {
    return {
      message: `Team engagement is currently at ${teamHealthMetrics.engagementScore}% (${teamHealthMetrics.engagementTrend} trend). Based on recent survey data, the Engineering team may need attention.`,
      widgets: ['teamHealth'],
      suggestions: [
        'What is driving low engagement?',
        'Show survey comments',
        'Compare departments'
      ]
    };
  }

  // Turnover/retention
  if (q.includes('turnover') || q.includes('retention') || q.includes('leaving') || q.includes('quit')) {
    return {
      message: `Current turnover risk is ${teamHealthMetrics.turnoverRisk}. I recommend focusing on engagement initiatives for at-risk employees.`,
      widgets: ['teamHealth'],
      suggestions: [
        'Who is at risk of leaving?',
        'Schedule retention conversations',
        'Show exit interview trends'
      ]
    };
  }

  // Catch-all / general queries
  return {
    message: `I've gathered all relevant information for "${query}". Here's what I found across your HR dashboard.`,
    widgets: ['teamHealth', 'whoIsOut', 'quickActions', 'priorityAlerts', 'feed'],
    suggestions: [
      'What needs my attention today?',
      'Show my team health metrics',
      'Who is out this week?'
    ]
  };
}

export function HRManagerHome() {
  const userName = 'Sarah';
  const userPhoto = 'https://i.pravatar.cc/80?u=sarah';

  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [promptsFading, setPromptsFading] = useState(false);
  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<NewEmployeeInfo | null>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const prevHistoryLength = useRef(0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Scroll to the latest message when new content is added
  useEffect(() => {
    if (chatHistory.length > prevHistoryLength.current && latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevHistoryLength.current = chatHistory.length;
  }, [chatHistory]);

  // Auto-dismiss slidedown notification
  useEffect(() => {
    if (slidedownMessage) {
      const timer = setTimeout(() => setSlidedownMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [slidedownMessage]);

  const handleSubmit = useCallback((query: string) => {
    if (!query.trim()) return;

    setCurrentQuery(query);
    setIsProcessing(true);
    setSearchQuery('');

    // Simulate LLM processing delay
    setTimeout(() => {
      const response = processQuery(query);
      const newMessage: ChatMessage = {
        id: ++messageIdRef.current,
        query: query,
        response: response,
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, newMessage]);
      setIsProcessing(false);
      setCurrentQuery('');
    }, 800);
  }, []);

  const handleFileSubmit = useCallback((file: File, _context: string) => {
    setCurrentQuery(`Processing ${file.name}...`);
    setIsProcessing(true);
    setSearchQuery('');

    setTimeout(() => {
      // Simulate extraction from file
      const extractedEmployee: NewEmployeeInfo = {
        firstName: 'Sarah',
        lastName: 'Johnson',
        jobTitle: 'Senior Software Engineer',
        department: 'Engineering',
        startDate: '2026-02-17',
        email: 'sarah.johnson@company.com',
        phone: '(555) 123-4567',
        sourceFile: file.name,
      };

      setNewEmployee(extractedEmployee);

      const newMessage: ChatMessage = {
        id: ++messageIdRef.current,
        query: `Add new employee from ${file.name}`,
        response: {
          message: `I've extracted the employee information from ${file.name}. Please review the details below and confirm.`,
          widgets: ['newEmployeeSummary'],
          suggestions: ['Send welcome email', 'Edit employee details', 'Add another employee'],
        },
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, newMessage]);
      setSlidedownMessage(`Successfully added ${extractedEmployee.firstName} ${extractedEmployee.lastName} to the system!`);
      setIsProcessing(false);
      setCurrentQuery('');
    }, 1200);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    handleSubmit(suggestion);
  };

  const handlePromptClick = (query: string) => {
    setPromptsFading(true);

    // Wait for fade animation, then submit
    setTimeout(() => {
      handleSubmit(query);
    }, 300);
  };

  const handleBackToHome = () => {
    setChatHistory([]);
    setSearchQuery('');
    setCurrentQuery('');
    setIsProcessing(false);
    setPromptsFading(false);
  };

  // Get birthday celebration for AI message (single)
  const birthdayCelebration = {
    id: 1,
    employee: sampleEmployees[1],
    type: 'birthday' as const,
    date: '2026-02-06',
  };

  // Birthday celebrations stack (Marcus, Charlotte, James)
  const birthdayCelebrationsStack = [
    {
      id: 1,
      employee: sampleEmployees[1], // Marcus Chen
      type: 'birthday' as const,
      date: '2026-02-08',
    },
    {
      id: 2,
      employee: sampleEmployees[0], // Charlotte Abbott
      type: 'birthday' as const,
      date: '2026-02-12',
    },
    {
      id: 3,
      employee: sampleEmployees[3], // James Wilson
      type: 'birthday' as const,
      date: '2026-02-15',
    },
  ];

  const isInitialState = chatHistory.length === 0 && !isProcessing;
  const hasActiveContent = chatHistory.length > 0 || isProcessing;

  // Helper function to render widgets for a given set of widget types
  const renderWidgets = (widgets: WidgetType[], messageId: number) => {
    const widgetSet = new Set(widgets);
    return (
      <div className="hr-home-widgets">
        {widgetSet.has('teamHealth') && (
          <div key={`${messageId}-teamHealth`} className="hr-home-widget hr-home-widget--animate">
            <TeamHealthCard metrics={teamHealthMetrics} />
          </div>
        )}
        {widgetSet.has('whoIsOut') && (
          <div key={`${messageId}-whoIsOut`} className="hr-home-widget hr-home-widget--animate">
            <WhoIsOutCard todayAbsences={todayAbsences} weekAbsences={weekAbsences} />
          </div>
        )}
        {widgetSet.has('quickActions') && (
          <div key={`${messageId}-quickActions`} className="hr-home-widget hr-home-widget--animate">
            <QuickActionsCard actions={quickActions} />
          </div>
        )}
        {widgetSet.has('priorityAlerts') && (
          <div key={`${messageId}-priorityAlerts`} className="hr-home-widget hr-home-widget--animate">
            <PriorityAlertsCard alerts={priorityAlerts} />
          </div>
        )}
        {widgetSet.has('feed') && (
          <div key={`${messageId}-feed`} className="hr-home-widget hr-home-widget--animate">
            <AllUpdatesTable items={feedItems} />
          </div>
        )}
        {widgetSet.has('lowEngagement') && (
          <div key={`${messageId}-lowEngagement`} className="hr-home-widget hr-home-widget--animate">
            <LowEngagementCard employees={lowEngagementEmployees} />
          </div>
        )}
        {widgetSet.has('quarterComparison') && (
          <div key={`${messageId}-quarterComparison`} className="hr-home-widget hr-home-widget--animate">
            <QuarterComparisonCard quarters={quarterlyMetrics} />
          </div>
        )}
        {widgetSet.has('departmentInsights') && (
          <div key={`${messageId}-departmentInsights`} className="hr-home-widget hr-home-widget--animate">
            <DepartmentInsightsCard departments={departmentMetrics} />
          </div>
        )}
        {widgetSet.has('coverageGaps') && (
          <div key={`${messageId}-coverageGaps`} className="hr-home-widget hr-home-widget--animate">
            <CoverageGapsCard gaps={coverageGaps} />
          </div>
        )}
        {widgetSet.has('trainingCompliance') && (
          <div key={`${messageId}-trainingCompliance`} className="hr-home-widget hr-home-widget--animate">
            <TrainingComplianceCard records={trainingRecords} />
          </div>
        )}
        {widgetSet.has('atRiskEmployees') && (
          <div key={`${messageId}-atRiskEmployees`} className="hr-home-widget hr-home-widget--animate">
            <AtRiskEmployeesCard
              employees={atRiskEmployees}
              talkingPoints={aiGeneratedMessages.retentionTalkingPoints}
            />
          </div>
        )}
        {widgetSet.has('aiMessage') && (
          <div key={`${messageId}-aiMessage`} className="hr-home-widget hr-home-widget--animate">
            <AIMessageCard
              celebration={birthdayCelebration}
              generatedMessage={aiGeneratedMessages.birthdayMessage(sampleEmployees[1])}
            />
          </div>
        )}
        {widgetSet.has('birthdayMessageStack') && (
          <div key={`${messageId}-birthdayMessageStack`} className="hr-home-widget hr-home-widget--animate">
            <BirthdayMessageStackCard celebrations={birthdayCelebrationsStack} />
          </div>
        )}
        {widgetSet.has('exitInterviewTrends') && (
          <div key={`${messageId}-exitInterviewTrends`} className="hr-home-widget hr-home-widget--animate">
            <ExitInterviewTrendsCard trends={exitInterviewTrends} totalExits={25} />
          </div>
        )}
        {widgetSet.has('surveyComments') && (
          <div key={`${messageId}-surveyComments`} className="hr-home-widget hr-home-widget--animate">
            <SurveyCommentsCard comments={surveyComments} />
          </div>
        )}
        {widgetSet.has('payrollDeadlines') && (
          <div key={`${messageId}-payrollDeadlines`} className="hr-home-widget hr-home-widget--animate">
            <PayrollDeadlinesCard deadlines={payrollDeadlines} />
          </div>
        )}
        {widgetSet.has('completedGoals') && (
          <div key={`${messageId}-completedGoals`} className="hr-home-widget hr-home-widget--animate">
            <CompletedGoalsCard goals={completedGoalsThisMonth} />
          </div>
        )}
        {widgetSet.has('overdueReviews') && (
          <div key={`${messageId}-overdueReviews`} className="hr-home-widget hr-home-widget--animate">
            <OverdueReviewsCard reviews={overdueReviews} />
          </div>
        )}
        {widgetSet.has('employeesNeedingFeedback') && (
          <div key={`${messageId}-employeesNeedingFeedback`} className="hr-home-widget hr-home-widget--animate">
            <EmployeesNeedingFeedbackCard employees={employeesNeedingFeedback} />
          </div>
        )}
        {widgetSet.has('futureAbsences') && (
          <div key={`${messageId}-futureAbsences`} className="hr-home-widget hr-home-widget--animate">
            <FutureAbsencesCard
              absences={nextMonthAbsences}
              title="Next Month's Absences"
              subtitle="March 2026 planned absences"
            />
          </div>
        )}
        {widgetSet.has('workAnniversaries') && (
          <div key={`${messageId}-workAnniversaries`} className="hr-home-widget hr-home-widget--animate">
            <WorkAnniversariesCard celebrations={workAnniversariesThisMonth} />
          </div>
        )}
        {widgetSet.has('upcomingCelebrations') && (
          <div key={`${messageId}-upcomingCelebrations`} className="hr-home-widget hr-home-widget--animate">
            <UpcomingCelebrationsCard celebrations={upcomingCelebrations} />
          </div>
        )}
        {widgetSet.has('pendingTimeOff') && (
          <div key={`${messageId}-pendingTimeOff`} className="hr-home-widget hr-home-widget--animate">
            <PendingTimeOffCard requests={pendingTimeOffRequests} />
          </div>
        )}

        {/* Additional Insight Widgets */}
        {widgetSet.has('scheduled1on1s') && (
          <div key={`${messageId}-scheduled1on1s`} className="hr-home-widget hr-home-widget--animate">
            <Scheduled1on1sCard />
          </div>
        )}
        {widgetSet.has('industryBenchmarks') && (
          <div key={`${messageId}-industryBenchmarks`} className="hr-home-widget hr-home-widget--animate">
            <IndustryBenchmarksCard />
          </div>
        )}
        {widgetSet.has('yearOverYearTrends') && (
          <div key={`${messageId}-yearOverYearTrends`} className="hr-home-widget hr-home-widget--animate">
            <YearOverYearTrendsCard />
          </div>
        )}
        {widgetSet.has('engineeringTeamFocus') && (
          <div key={`${messageId}-engineeringTeamFocus`} className="hr-home-widget hr-home-widget--animate">
            <EngineeringTeamFocusCard />
          </div>
        )}
        {widgetSet.has('backupCoverage') && (
          <div key={`${messageId}-backupCoverage`} className="hr-home-widget hr-home-widget--animate">
            <BackupCoverageCard />
          </div>
        )}
        {widgetSet.has('workloadDistribution') && (
          <div key={`${messageId}-workloadDistribution`} className="hr-home-widget hr-home-widget--animate">
            <WorkloadDistributionCard />
          </div>
        )}
        {widgetSet.has('overdueItems') && (
          <div key={`${messageId}-overdueItems`} className="hr-home-widget hr-home-widget--animate">
            <OverdueItemsCard />
          </div>
        )}
        {widgetSet.has('automationSetup') && (
          <div key={`${messageId}-automationSetup`} className="hr-home-widget hr-home-widget--animate">
            <AutomationSetupCard />
          </div>
        )}
        {widgetSet.has('trainingByCategory') && (
          <div key={`${messageId}-trainingByCategory`} className="hr-home-widget hr-home-widget--animate">
            <TrainingByCategoryCard />
          </div>
        )}
        {widgetSet.has('trainingCompletionRates') && (
          <div key={`${messageId}-trainingCompletionRates`} className="hr-home-widget hr-home-widget--animate">
            <TrainingCompletionRatesCard />
          </div>
        )}
        {widgetSet.has('rootCauseAnalysis') && (
          <div key={`${messageId}-rootCauseAnalysis`} className="hr-home-widget hr-home-widget--animate">
            <RootCauseAnalysisCard />
          </div>
        )}
        {widgetSet.has('upcomingBirthdays') && (
          <div key={`${messageId}-upcomingBirthdays`} className="hr-home-widget hr-home-widget--animate">
            <UpcomingBirthdaysCard />
          </div>
        )}
        {widgetSet.has('autoSendSetup') && (
          <div key={`${messageId}-autoSendSetup`} className="hr-home-widget hr-home-widget--animate">
            <AutoSendSetupCard />
          </div>
        )}
        {widgetSet.has('recognitionEvent') && (
          <div key={`${messageId}-recognitionEvent`} className="hr-home-widget hr-home-widget--animate">
            <RecognitionEventCard />
          </div>
        )}
        {widgetSet.has('pastMilestones') && (
          <div key={`${messageId}-pastMilestones`} className="hr-home-widget hr-home-widget--animate">
            <PastMilestonesCard />
          </div>
        )}
        {widgetSet.has('milestoneAchievements') && (
          <div key={`${messageId}-milestoneAchievements`} className="hr-home-widget hr-home-widget--animate">
            <MilestoneAchievementsCard />
          </div>
        )}
        {widgetSet.has('surveyBySentiment') && (
          <div key={`${messageId}-surveyBySentiment`} className="hr-home-widget hr-home-widget--animate">
            <SurveyBySentimentCard />
          </div>
        )}
        {widgetSet.has('growthPrograms') && (
          <div key={`${messageId}-growthPrograms`} className="hr-home-widget hr-home-widget--animate">
            <GrowthProgramsCard />
          </div>
        )}
        {widgetSet.has('promotionRates') && (
          <div key={`${messageId}-promotionRates`} className="hr-home-widget hr-home-widget--animate">
            <PromotionRatesCard />
          </div>
        )}
        {widgetSet.has('feedbackTemplates') && (
          <div key={`${messageId}-feedbackTemplates`} className="hr-home-widget hr-home-widget--animate">
            <FeedbackTemplatesCard />
          </div>
        )}
        {widgetSet.has('newHireUpdates') && (
          <div key={`${messageId}-newHireUpdates`} className="hr-home-widget hr-home-widget--animate">
            <NewHireUpdatesCard />
          </div>
        )}
        {widgetSet.has('weeklyUpdates') && (
          <div key={`${messageId}-weeklyUpdates`} className="hr-home-widget hr-home-widget--animate">
            <WeeklyUpdatesCard />
          </div>
        )}
        {widgetSet.has('actionableItems') && (
          <div key={`${messageId}-actionableItems`} className="hr-home-widget hr-home-widget--animate">
            <ActionableItemsCard />
          </div>
        )}
        {widgetSet.has('ptoPolicy') && (
          <div key={`${messageId}-ptoPolicy`} className="hr-home-widget hr-home-widget--animate">
            <PtoPolicyCard />
          </div>
        )}
        {widgetSet.has('pendingTimesheets') && (
          <div key={`${messageId}-pendingTimesheets`} className="hr-home-widget hr-home-widget--animate">
            <PendingTimesheetsCard />
          </div>
        )}
        {widgetSet.has('bonusCalculations') && (
          <div key={`${messageId}-bonusCalculations`} className="hr-home-widget hr-home-widget--animate">
            <BonusCalculationsCard />
          </div>
        )}
        {widgetSet.has('benefitEnrollments') && (
          <div key={`${messageId}-benefitEnrollments`} className="hr-home-widget hr-home-widget--animate">
            <BenefitEnrollmentsCard />
          </div>
        )}
        {widgetSet.has('reviewCalendar') && (
          <div key={`${messageId}-reviewCalendar`} className="hr-home-widget hr-home-widget--animate">
            <ReviewCalendarCard />
          </div>
        )}
        {widgetSet.has('retentionMeetings') && (
          <div key={`${messageId}-retentionMeetings`} className="hr-home-widget hr-home-widget--animate">
            <RetentionMeetingsCard />
          </div>
        )}
        {widgetSet.has('newEmployeeSummary') && newEmployee && (
          <div key={`${messageId}-newEmployeeSummary`} className="hr-home-widget hr-home-widget--animate">
            <NewEmployeeSummaryCard employee={newEmployee} />
          </div>
        )}

        {/* Feedback Controls */}
        <div className="hr-home-feedback-controls">
          <IconButton
            icon="thumbs-up-regular"
            aria-label="Good response"
            variant="outlined"
            size="small"
          />
          <IconButton
            icon="thumbs-down-regular"
            aria-label="Bad response"
            variant="outlined"
            size="small"
          />
          <IconButton
            icon="copy-regular"
            aria-label="Copy response"
            variant="outlined"
            size="small"
          />
          <IconButton
            icon="arrows-rotate-solid"
            aria-label="Regenerate response"
            variant="outlined"
            size="small"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`hr-manager-home ${isInitialState ? 'hr-manager-home--initial' : 'hr-manager-home--active'}`}>
      {/* Slidedown Notification */}
      {slidedownMessage && (
        <div className="hr-home-slidedown">
          <div className="hr-home-success-toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedownMessage}</BodyText>
          </div>
        </div>
      )}

      {/* Greeting Section - Hidden when active */}
      <div className={`hr-home-header ${hasActiveContent ? 'hr-home-header--hidden' : ''}`}>
        <div className="hr-home-greeting">
          <Avatar src={userPhoto} alt={userName} size={80} />
          <div className="hr-home-greeting-text">
            <Headline size="large">
              {getGreeting()}, {userName}!
            </Headline>
            <BodyText color="neutral-weak">
              Get instant help with HR questions, policies, compliance,<br />and people management.
            </BodyText>
          </div>
        </div>
      </div>

      {/* Initial prompts - Only visible in initial state */}
      {isInitialState && (
        <div className={`hr-home-initial-prompts ${promptsFading ? 'hr-home-initial-prompts--fading' : ''}`}>
          <div className="hr-home-prompts-buttons">
            <ActionTile
              title="Who is out today?"
              icon="calendar-xmark-solid"
              variant="ai"
              onClick={() => handlePromptClick('Who is out today?')}
            />
            <ActionTile
              title="How is my team doing?"
              icon="heart-pulse-solid"
              variant="ai"
              onClick={() => handlePromptClick('How is my team doing?')}
            />
            <ActionTile
              title="What needs my attention?"
              icon="bell-solid"
              variant="ai"
              onClick={() => handlePromptClick('What needs my attention?')}
            />
            <ActionTile
              title="Pending time off requests"
              icon="plane-departure-solid"
              variant="ai"
              onClick={() => handlePromptClick('Show me pending time off requests')}
            />
            <ActionTile
              title="Upcoming celebrations"
              icon="cake-candles-solid"
              variant="ai"
              onClick={() => handlePromptClick('Any birthdays or anniversaries coming up?')}
            />
            <ActionTile
              title="Performance updates"
              icon="chart-line-up-solid"
              variant="ai"
              onClick={() => handlePromptClick('Show me team performance updates')}
            />
          </div>
        </div>
      )}

      {/* Main Content Area - Chat Feed (only rendered after chat is initiated) */}
      {hasActiveContent && (
        <div className="hr-home-content hr-home-content--visible">
          {/* Back to Home */}
          <button className="hr-home-back-button" onClick={handleBackToHome}>
            <IconV2 name="chevron-left-solid" size={16} color="neutral-weak" />
            <BodyText size="small" color="neutral-weak">Back</BodyText>
          </button>

          {/* Chat History */}
          {chatHistory.map((message, index) => (
          <div
            key={message.id}
            className="hr-home-chat-message"
            ref={index === chatHistory.length - 1 ? latestMessageRef : null}
          >
            {/* User Query */}
            <StyledBox backgroundColor="neutral-extra-weak" borderRadius="medium" padding="small">
              <div className="hr-home-user-query">
                <Avatar src={userPhoto} alt={userName} size={32} />
                <BodyText weight="medium" color="neutral-strong">{message.query}</BodyText>
              </div>
            </StyledBox>

            {/* AI Response */}
            <div className="hr-home-ai-response">
              <InlineMessage
                status="ai"
                title="Here's what I found"
                description={message.response.message}
              />

              {/* Widgets for this response */}
              {renderWidgets(message.response.widgets, message.id)}

              {/* Follow-up suggestions - only show on the last message */}
              {index === chatHistory.length - 1 && !isProcessing && message.response.suggestions && message.response.suggestions.length > 0 && (
                <div className="hr-home-suggestions">
                  <BodyText size="small" color="neutral-weak">Follow-up questions:</BodyText>
                  <div className="hr-home-suggestion-buttons">
                    {message.response.suggestions.map((suggestion, suggIndex) => (
                      <Button
                        key={suggIndex}
                        size="small"
                        color="ai"
                        variant="outlined"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Current Processing State */}
        {isProcessing && (
          <div className="hr-home-chat-message">
            {/* User Query */}
            <StyledBox backgroundColor="neutral-extra-weak" borderRadius="medium" padding="small">
              <div className="hr-home-user-query">
                <Avatar src={userPhoto} alt={userName} size={32} />
                <BodyText weight="medium" color="neutral-strong">{currentQuery}</BodyText>
              </div>
            </StyledBox>

            {/* Thinking indicator */}
            <div className="hr-home-ai-response hr-home-ai-response--animate">
              <div className="hr-home-ai-thinking">
                <InlineMessage
                  status="ai"
                  title="Thinking..."
                  description="Analyzing your workforce data to find the best answer."
                />
              </div>
            </div>
          </div>
        )}

        </div>
      )}

      {/* Search Section - Fixed at bottom when active */}
      <div className={`hr-home-search-section ${hasActiveContent ? 'hr-home-search-section--fixed' : ''}`}>
        <AIChatPrompt
          placeholder="Ask a question or request a task..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSubmit}
          onFileSubmit={handleFileSubmit}
          onVoiceClick={() => console.log('Voice clicked')}
          onAttachmentClick={() => console.log('Attachment clicked')}
          onImageClick={() => console.log('Image clicked')}
        />
      </div>
    </div>
  );
}

export default HRManagerHome;
