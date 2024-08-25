export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const isEmptyValue = (value) => {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    JSON.stringify(value) == '{}' ||
    JSON.stringify(value) == '[]'
  ) {
    return true;
  }
  return false;
};

export const isExist = (value) => !isEmptyValue(value);

export function convertHtmlToMention(str = '') {
  return str.replace(
    /<span class="mention" (.*?)>@(.*?)<\/span>/g,
    '{*mention-$2-mention*}',
  );
}

export function converMentionToHTML(str = '') {
  return str.replace(
    /{\*mention-(.*?)-mention\*}/g,
    '<span class="mention" data-mention="@$1">@$1</span>',
  );
}
