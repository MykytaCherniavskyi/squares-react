import React from 'react';
import Table from './Table';
import { shallow, mount } from 'enzyme';

it('Render component', () => {
  const component = <Table initialWidth={4} initialHeight={4} cellSize={50} />;
  const tree = shallow(component);

  expect(tree).toMatchSnapshot();
});

describe('Render with default props', () => {
  const propsComponent = {
    initialWidth: 4,
    initialHeight: 4,
    cellSize: 50
  };
  let component, tree;

  beforeEach(() => {
    component = <Table initialWidth={4} initialHeight={4} cellSize={50} />;
    tree = mount(component);
  });

  it('Render with default initialWidth', () => {
    expect(tree.prop('initialWidth')).toEqual(propsComponent.initialWidth);
  });
  it('Render with default initialHeight', () => {
    expect(tree.props().initialHeight).toEqual(propsComponent.initialHeight);
  });
  it('Render with default cellSize', () => {
    expect(tree.props().cellSize).toEqual(propsComponent.cellSize);
  });
});

describe('Manipulation with table', () => {
  let component, tree;

  beforeEach(() => {
    component = <Table initialWidth={4} initialHeight={4} cellSize={50} />;
    tree = mount(component);
  });

  it('Current default table grid (row - 4, col - 4)', () => {
    expect(tree.state().grid).toHaveLength(4);
    expect(tree.state().grid[0].cells).toHaveLength(4);
  });

  it('Add one row (row - 5, col - 4)', () => {
    tree
      .find('.squere.squere-plus')
      .last()
      .simulate('click');

    expect(tree.state().grid).toHaveLength(5);
  });

  it('Add one column (row - 4, col - 5)', () => {
    tree
      .find('.squere.squere-plus')
      .first()
      .simulate('click');

    expect(tree.state().grid[0].cells).toHaveLength(5);
  });

  it('Remove one column (row - 4, col - 3)', () => {
    expect(tree.state().visible.up).toBeFalsy();

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });
    tree.hovered = {
      col: 0
    };

    tree
      .find('.center')
      .children()
      .first()
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .first()
      .simulate('click');

    expect(tree.state().grid[0].cells).toHaveLength(3);
  });

  it('Remove one row (row - 3, col - 4)', () => {
    expect(tree.state().visible.left).toBeFalsy();

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .last()
      .simulate('click');

    expect(tree.state().grid).toHaveLength(3);
  });

  it('cannot be removed less than 1 row', () => {
    expect(tree.state().visible.left).toBeFalsy();

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .last()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .last()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .last()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .last()
      .simulate('click');

    expect(tree.state().grid).toHaveLength(1);
  });

  it('cannot be removed less than 1 col', () => {
    expect(tree.state().visible.up).toBeFalsy();

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .first()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .first()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .first()
      .simulate('click');

    tree.setState({
      visible: {
        up: true,
        left: true
      }
    });

    tree
      .find('.center')
      .children()
      .first()
      .children()
      .first()
      .simulate('mouseover');

    tree
      .find('.squere.squere-minus.squere-minus_visible')
      .first()
      .simulate('click');

    expect(tree.state().grid[0].cells).toHaveLength(1);
  });
});
