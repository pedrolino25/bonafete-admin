export enum SpaceStatus {
  Pending = 'pending',
  Active = 'published',
  Archived = 'archived',
  Draft = 'draft',
}

export enum HostStatus {
  Pending = 'pending',
  Active = 'completed',
  Archived = 'archived',
  Suspended = 'suspended',
}

export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  CancelledByClient = 'cancelled-by-client',
  CancelledByHost = 'cancelled-by-host',
}
