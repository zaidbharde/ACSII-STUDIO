export type ContributionStatus = 'pending' | 'visible' | 'delayed';

export interface ContributionLabel {
  commitSha: string;
  status: ContributionStatus;
  message: string;
}

export function labelContribution(commitSha: string, status: ContributionStatus): ContributionLabel {
  if (!/^[0-9a-f]{7,40}$/i.test(commitSha)) throw new Error('commitSha must be hexadecimal');
  const message = status === 'visible'
    ? 'Contribution is visible in the profile graph.'
    : status === 'delayed'
      ? 'Commit is remote but profile indexing is delayed.'
      : 'Waiting for GitHub profile indexing.';
  return { commitSha, status, message };
}

export function isIndexed(label: ContributionLabel): boolean {
  return label.status === 'visible';
}
