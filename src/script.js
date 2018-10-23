window.onload = (e) => {

    class Table {

        constructor (matrixWrapper){
            //Controls
            this.matrixWrapper = matrixWrapper;

            this.minusTop = this.matrixWrapper.querySelector('.up .squere-minus');
            this.minusLeft = this.matrixWrapper.querySelector('.left .squere-minus');
            this.plusRight = this.matrixWrapper.querySelector('.right .squere-plus');
            this.plusBottom = this.matrixWrapper.querySelector('.bottom .squere-plus');

            //Environment
            this.matrix = this.matrixWrapper.querySelector('.center');
            this.rows = this.matrixWrapper.getElementsByClassName('row');

            this.offsets = {
                offsetLeft: 0,
                offsetTop: 0
            };
            this.positions = {
                div: 0,
                row: 0
            };

            //Events
            this.plusBottom.onclick = this.addRow.bind(this);

            this.plusRight.onclick = this.addColumn.bind(this);

            this.minusLeft.onclick = this.removeRow.bind(this);

            this.minusTop.onclick = this.removeColumn.bind(this);

            this.matrixWrapper.onmouseover = this.tableOver.bind(this);

            this.matrixWrapper.onmouseout = this.tableOut.bind(this);

        }

        createDiv(classElement) {
            const div = document.createElement('div');
            div.classList.add(classElement);
            return div;
        }

        createRow(classElement){

            const div = document.createElement('div');

            const row = div.cloneNode(false);
            row.classList.add(classElement);

            const count = this.matrix.firstElementChild.childElementCount;

            for (let i = 0; i < count; i++) row.append(div.cloneNode(false));

            for (let div of row.children) div.classList.add('squere');


            return row;
        };

        addRow() {
            let row = this.createRow('row');
            this.matrix.appendChild(row);
        }

        addColumn() {

            const countRows = this.rows.length;
            for (let i = 0; i < countRows; i++) {
                let row = this.rows[i];
                let div = this.createDiv('squere');
                row.appendChild(div);
            }

        }

        removeRow(e) {
            this.minusLeft.style.visibility = 'hidden';
            this.minusTop.style.visibility = 'hidden';
            //Проверка, чтобы не удалялась последняя строка

            setTimeout(() => {
                if (this.rows.length === 1) return false;

                let row = this.rows[this.positions.row];
                this.positions.row = NaN;

                if (typeof row === 'undefined') return false;

                row.remove();
            },200);

        }

        removeColumn(e) {
            this.minusTop.style.visibility = 'hidden';
            this.minusLeft.style.visibility = 'hidden';

            setTimeout(() => {
                for (let row of this.rows) {

                    if (row.children.length === 1) return false;

                    let div = row.children[this.positions.div];

                    if (typeof div === 'undefined') return false;

                    div.remove();

                }
                this.positions.div = NaN;
            },200);


        }

        tableOver(e) {

            const target = e.target;

            if (target === this.matrix
                || target.className === 'squere'
                || target.className === 'row'
                || target.className === 'squere squere-minus') {

                const rowsCount = this.rows.length;
                const cellCount = this.rows[0].childElementCount;

                if  (rowsCount > 1) this.minusLeft.style.visibility = 'visible';
                else this.minusLeft.style.visibility = 'hidden';
                if  (cellCount > 1) this.minusTop.style.visibility = 'visible';
                else this.minusTop.style.visibility = 'hidden';

                this.offsets.offsetLeft = target.getBoundingClientRect().top - this.matrix.getBoundingClientRect().top;
                this.offsets.offsetTop = target.getBoundingClientRect().left - this.matrix.getBoundingClientRect().left;

                //Фильтрация чисто элементов центральной таблицы (контролы удалены)
                const allSquares = this.matrixWrapper.getElementsByClassName('squere');
                const inCenterSquares = Array.prototype.filter.call(allSquares, function(allSquares){
                    return allSquares.className === 'squere';
                });

                // Проверяю, что фокус именно на эллементе таблицы
                if  (inCenterSquares.includes(target)) {

                    const currentRow = target.parentElement;
                    const currentInnerDiv = target;

                    this.positions.row = Array.from(this.matrix.children).indexOf(currentRow);
                    this.positions.div = Array.from(currentRow.children).indexOf(currentInnerDiv);

                    this.minusTop.style.left = this.offsets.offsetTop + 'px';
                    this.minusLeft.style.top = this.offsets.offsetLeft + 'px';

                }

            } else {
                this.minusLeft.style.visibility = 'hidden';
                this.minusTop.style.visibility = 'hidden';
            }

        }

        tableOut(e) {

            const target = e.target;

            if (!(target === this.matrix
                || target.className === 'squere'
                || target.className === 'row')) {

                this.minusLeft.style.visibility = 'hidden';
                this.minusTop.style.visibility = 'hidden';

            }

        }


    }

    let matrixArr = Array.from(document.getElementsByClassName('squeres-folder'));
    matrixArr.forEach( matrix => new Table(matrix))

};