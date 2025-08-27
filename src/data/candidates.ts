export type CandidateStatus = 'pending' | 'in-progress' | 'clear' | 'review' | 'rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  status: CandidateStatus;
  dateAdded: string;
  dateCompleted?: string;
  reportData?: {
    identity: 'verified' | 'pending' | 'failed';
    criminal: 'clear' | 'review' | 'pending';
    education: 'verified' | 'unverified' | 'pending';
    employment: 'verified' | 'partial' | 'pending';
    socialMedia: 'clear' | 'review' | 'pending';
    onlinePresence: 'clear' | 'review' | 'pending';
    summary: string;
  };
}

export const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'clear',
    dateAdded: '2024-01-15',
    dateCompleted: '2024-01-18',
    reportData: {
      identity: 'verified',
      criminal: 'clear',
      education: 'verified',
      employment: 'verified',
      socialMedia: 'clear',
      onlinePresence: 'clear',
      summary: 'Candidate has a clean record with all verifications complete. Highly recommended for hiring.'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'review',
    dateAdded: '2024-01-20',
    dateCompleted: '2024-01-23',
    reportData: {
      identity: 'verified',
      criminal: 'clear',
      education: 'unverified',
      employment: 'partial',
      socialMedia: 'review',
      onlinePresence: 'clear',
      summary: 'Candidate has a clean criminal record and verified employment history. One education record pending verification from university registrar.'
    }
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    status: 'pending',
    dateAdded: '2024-01-25',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    status: 'in-progress',
    dateAdded: '2024-01-24',
  }
];

// Mock data for different report scenarios
export const getReportData = (candidateId: string) => {
  const reports = {
    '1': {
      identity: 'verified' as const,
      criminal: 'clear' as const,
      education: 'verified' as const,
      employment: 'verified' as const,
      socialMedia: 'clear' as const,
      onlinePresence: 'clear' as const,
      summary: 'Candidate has a clean record with all verifications complete. Employment history shows consistent progression and all educational credentials verified.'
    },
    '2': {
      identity: 'verified' as const,
      criminal: 'clear' as const,
      education: 'unverified' as const,
      employment: 'partial' as const,
      socialMedia: 'review' as const,
      onlinePresence: 'clear' as const,
      summary: 'Candidate has a clean criminal record. Employment verification shows 2 of 3 positions verified. University registrar has not yet responded to education verification request.'
    },
    '3': {
      identity: 'pending' as const,
      criminal: 'pending' as const,
      education: 'pending' as const,
      employment: 'pending' as const,
      socialMedia: 'pending' as const,
      onlinePresence: 'pending' as const,
      summary: 'Background check initiated. Awaiting candidate consent and document submission.'
    }
  };
  
  return reports[candidateId as keyof typeof reports] || reports['3'];
};