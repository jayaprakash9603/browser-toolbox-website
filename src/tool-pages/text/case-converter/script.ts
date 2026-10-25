import type { Fact, WalkStep } from '@/components/tool/story'

export const INPUT = 'user profile settings'

export const CASES = [
  { id: 'lower', label: 'lower', value: 'user profile settings' },
  { id: 'upper', label: 'UPPER', value: 'USER PROFILE SETTINGS' },
  { id: 'title', label: 'Title', value: 'User Profile Settings' },
  { id: 'sentence', label: 'Sentence', value: 'User profile settings' },
  { id: 'camel', label: 'camelCase', value: 'userProfileSettings' },
  { id: 'pascal', label: 'PascalCase', value: 'UserProfileSettings' },
  { id: 'snake', label: 'snake_case', value: 'user_profile_settings' },
  { id: 'kebab', label: 'kebab-case', value: 'user-profile-settings' },
  { id: 'constant', label: 'CONSTANT', value: 'USER_PROFILE_SETTINGS' },
]

export const SEQUENCE = ['camel', 'snake', 'constant'] as const

export const STEPS: WalkStep[] = [
  {
    title: 'Type or paste anything',
    body: 'A label, a sentence, a variable name from another language. Spaces, dashes and underscores are all understood.',
  },
  {
    title: 'camelCase for JavaScript',
    body: 'Words are detected and re-joined, so the result is a valid identifier straight away.',
  },
  {
    title: 'snake_case for Python and SQL',
    body: 'Switch target and every letter re-flows into the new convention.',
  },
  {
    title: 'CONSTANT_CASE, then copy',
    body: 'Environment variables and enums in one more click, copied and ready to paste.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const FACTS: Fact[] = [
  { value: '9', label: 'Cases, from lower to CONSTANT_CASE' },
  { value: '1 click', label: 'Per conversion, copied to the clipboard' },
  { value: 'Local', label: 'Text never leaves the panel' },
  { value: 'Any', label: 'Input: spaces, dashes, underscores or mixed case' },
]
