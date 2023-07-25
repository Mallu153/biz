export class Team {
  teamId: number;
  createdBy: string;
  createdDate: string;
  departmentId: number;
  endDate: string;
  moduleId: number;
  organizationId: number;
  startDate: string;
  businessUnit: number;
  teamEmail: string;
  status: string;
  teamName: string;
  upDatedBy: string;
  upDatedDate: string;
}

export class Statuses {
  statusId: number;
  createdBy: string;
  createdDate: string;
  description: string;
  module: string;
  name: string;
  organization: string;
  status: string;
  upDatedBy: string;
  upDatedDate: string;
}

export class LanguageMaster {
  code: string;
  createdBy: number;
  createdDate: string;
  description: string;
  id: number;
  name: string;
  status: boolean;
  updatedBy: number;
  updatedDate: string;
}
export class GeneralSetups {
  id: number;
  name: string;
  code: string;
  description: string;
  status: boolean;
  createdBy: number;
  updatedBy: number;
  createdDate: string;
  updatedDate: string;
  constructor() {
    this.id =
      this.name =
      this.code =
      this.description =
      this.status =
      this.status =
      this.createdBy =
      this.updatedBy =
      this.createdDate =
      this.updatedDate =
      null;
  }
}
export interface Master {
  id: number;
  name: string;
  code: string;
  description: string;
  createdBy: number;
  createdDate: string;
  updatedBy?: number;
  updatedDate: string;
  status: boolean;
}
