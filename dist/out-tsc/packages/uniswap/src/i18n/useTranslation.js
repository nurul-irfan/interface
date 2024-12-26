import i18n, { t } from 'i18next';
import { useTranslation as useTranslationOG } from 'react-i18next';
import { isTestEnv } from 'utilities/src/environment/env';
export const useTranslation = isTestEnv()
    ? () => ({ i18n, t, ready: true })
    : useTranslationOG;
//# sourceMappingURL=useTranslation.js.map