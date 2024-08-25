import { Area } from '@components/Area/Area';
import { useSelector } from '@utils/hooks';
import { useMemo } from 'react';
import ReactJson from 'react-json-view';

export const Editor = () => {
  const fieldItems = useSelector((state) => state.field.items);

  const jsonView = useMemo(() => {
    const headers = fieldItems.map((item) => {
      return {
        type: item.type,
        label: item.name,
        offsetsExpression: {
          type: 'StaticOffsets',
          start: item.offsetFrom,
          end: item.offsetTo,
        },
        description: item?.description || '',
        id: item.id || '',
        constraints: {},
      };
    });
    return {
      headers,
      body: {},
    };
  }, [fieldItems]);

  return (
    <Area header="Editor">
      <div>
        <ReactJson
          src={jsonView}
          name={'DATA'}
          shouldCollapse={false}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
        />
      </div>
    </Area>
  );
};
