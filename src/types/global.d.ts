type ReactNode = import('react').ReactNode;
type RouteProps = import('react-router-dom').RouteProps;
type RouteObject = import('react-router-dom').RouteObject;
type RouteNames = import('@plugins/router').RouteNames;
type LazyExoticComponent<T> = import('react').LazyExoticComponent<T>;
type FC = import('react').FC;
type ReturnLazyLoadFunc = import('@utils/loadable').ReturnLazyLoadFunc;
type TranslationJsonType = typeof import('@locales/vi/translation.json');
/**
 * RouteConfig
 * @description
 * @private: boolean
 */
type RouteConfig = Omit<RouteObject, 'children' | 'element' | 'lazy'> & {
  isPrivate?: boolean;
  name?: RouteNames;
  children?: RouteConfig[];
  component?: ReactNode;
  LazyComponent?:
    | (() => Promise<{ default: React.ComponentType }>)
    | LazyExoticComponent<any>
    | ReturnLazyLoadFunc;
};

type IRouteConfig = Omit<RouteConfig, 'LazyComponent'> & {
  LazyComponent: FC<any>;
};

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

type I18nKey = RecursiveKeyOf<TranslationJsonType>;
