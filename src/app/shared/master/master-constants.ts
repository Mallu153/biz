import { environment } from "environments/environment";
const BACKEND_URL = environment.backendService;
const ES_SERVICE_URL = environment.E_SERVICES_API;
export const MASTER_CONSTANTS = {
  GET_TEAM: BACKEND_URL + "team/list",
  GET_STATUS: BACKEND_URL + "status/list",
  GET_STATUS_OWNER_MAPPING_BY_ORGANIZATION:
    BACKEND_URL + "status-owner-mapping/get-all-by-organization?organization=",
  GET_STATUS_OWNER_MAPPING_BY_DEFAULT_STATUS:
    BACKEND_URL + "status-owner-mapping/get-team-info?deafultStatus=",
  GET_LANGUAGES: ES_SERVICE_URL + "master/master_language/all",
  GET_FIELD_TYPES: ES_SERVICE_URL + "master/master_fieldtype/all",
  SEARCH_QUESTION: ES_SERVICE_URL + "question/search-questions/",
  SEARCH_QUESTION_BY_ORG: ES_SERVICE_URL + "question/search-questions",
  CREATE_QUESTION: ES_SERVICE_URL + "question/search-questions/",
};
export const MODULE = {
  SRTYPE: "SRTYPE",
  FROM_FAQ: "FAQ",
  FROM_SURVEY: "SURVEY",
};
export const QUESTION = {
  CREATE: ES_SERVICE_URL + "question/create-question",
};
