import React, { useCallback, useRef } from 'react';
import update from 'immutability-helper';
import ListCard from 'Molecules/ListCard';
import { DndProvider, useDrag, useDrop } from 'react-dnd'; // to update it to table with sorting, check chatgpt for more
import { HTML5Backend } from 'react-dnd-html5-backend';

const type = 'DraggableBodyRow';
const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{
        cursor: 'move',
        ...style,
      }}
      {...restProps}
    />
  );
};

export default (props) => {
  const { list, setHasDirty, setDataList } = props;
  
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const newData = [...list];
      const dragRow = list[dragIndex];
      setDataList(
        update(list, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
      if (list !== newData) {
        setHasDirty(true);
      }
    },
    [list]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <ListCard
        customComponents={components}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr;
        }}
        listClass={`dragRow ${props.classes}`}
        {...props}
      />
    </DndProvider>
  );
};
