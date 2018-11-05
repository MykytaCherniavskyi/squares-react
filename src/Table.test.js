import React from 'react';
// import ReactDOM from 'react-dom';
// import Row from './Row';
// import Cell from './Cell';
// import ButtonPlus from './ButtonPlus';
// import ButtonMinus from './ButtonMinus';
import Table from './Table';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';



describe('Table container', () => {
    const props = {
        col: 4,
        row: 4,
        size: '50'
    }


    describe('Table is rendering', () => {

        it('isRendering', () => {
            const currentProps = {
                ...props
            }

            const TableContainer = shallow(<Table {...currentProps} />);

            TableContainer.find('.left .squere-minus').simulate('click');

            

            // expect(TableContainer.find('.squere').style.width).toEqual('50');


        })

    })


})




// test('test', () => {

//     const table = renderer.create(<Table initialWidth = {4} initialHeight = {4} cellSize = '50'/>);

//     console.debug(table.delRow());

//     console.debug(table.toTree());


//     // let tree = table.toJSON();
//     // expect(tree).toMatchSnapshot();

//     // tree.this.delRow();

//     // let tree1 = table.toJSON();
//     // expect(tree).toMatchSnapshot();

//     // tree.this.delCol();

//     // let tree2 = table.toJSON();
//     // expect(tree).toMatchSnapshot();
// });
