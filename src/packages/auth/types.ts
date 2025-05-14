export interface UserProperties {
  usr_city: string;
  usr_industry: string;
  usr_job_title: string;
  usr_middle_name: string;
  usr_postcode: string;
  usr_salutation: string;
  usr_state_region: string;
  usr_street_address: string;
  usr_street_address_2: string;
}

export interface User {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string | null;
  username: string;
  phone_number: string;
  properties: UserProperties;
}

export interface UserOrganization {
  id: string;
  name: string;
}
export interface Organization {
  code: string;
  name: string;
}

export interface UserOrganizations {
  orgCodes: string[];
  orgs: Organization[];
}
