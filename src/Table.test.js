import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import Cell from './Cell';
import ButtonPlus from './ButtonPlus';
import ButtonMinus from './ButtonMinus';
import Table from './Table';
// import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

test('test', () => {

    const table = renderer.create(
        <Table
            initialWidth = {4}
            initialHeight = {4}
            cellSize = '50'
        />
    );

    let tree = table.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.delRow();

    let tree = table.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.delCol();

    let tree = table.toJSON();
    expect(tree).toMatchSnapshot();
});
