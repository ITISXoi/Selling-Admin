export const STORAGE_KEY = {
  token: 'token',
  email: 'email',
}

export const KEY_ITEM = {
  LOG_OUT: 'LOG_OUT',
}

export type FormSetCrawlTime = {
  templateId: number;
  crawlTime: string;
};

export type FormCreatePlan = {
  templateId: number;
  locationId: number;
  keywordId: number;
};