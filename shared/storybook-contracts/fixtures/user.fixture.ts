import { User } from '../types';

/**
 * User Fixture for Storybook
 * 
 * Deterministic user data for visual testing.
 */

export const userFixture: User = {
  id: 'user-fixture-1',
  email: 'john.doe@example.com',
  fullName: 'John Doe',
  avatar: null,
  createdAt: '2024-01-01T00:00:00.000Z'
};

export const userWithAvatar: User = {
  ...userFixture,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

