class c4tgrid {
    constructor(selector) {
        this.targetEl = $(selector);
        this.targetEl.empty();
        this.id = this.targetEl.attr("id");
        // this.rows = 50;
        // this.colls = 26;
        this.targetEl.append($('<input id="glbRows" name="glbRows" type="hidden" value="50">'));
        this.targetEl.append($('<input id="glbColls" name="glbColls" type="hidden" value="26">'));
        this.targetEl.addClass('c4tgrid')

        this.table = $('<table class="c4tCore"><thead></thead><tbody></tbody></table>');
        this.create();
    }
    add_key_event(main_class, inpt) {

        inpt.keydown(function(e) {
            var colls = int($('#glbColls').val());
            var rows = int($('#glbRows').val());
            var inp_r = int($(this).attr('r'));
            var inp_c = int($(this).attr('c'));
            var n_l_c = inp_c - 1;
            var n_r_c = inp_c + 1;
            var n_u_r = inp_r - 1;
            var n_d_r = inp_r + 1;
            globaldata[currentID]['data'][inp_r][inp_c] = $(this).text();
            switch (e.which) {
                case 37:
                    /* arrow left */
                    if (n_l_c >= 0) {
                        $('#' + main_class.id + "-row-" + inp_r + "-col-" + n_l_c).focus();
                    }
                    break;
                case 9:
                    /* tab */
                    if (n_r_c <= colls) {
                        $('#' + main_class.id + "-row-" + inp_r + "-col-" + n_r_c).focus();
                    }
                    break;
                case 38:
                    /* arrow up */
                    if (n_u_r >= 1) {
                        $('#' + main_class.id + "-row-" + n_u_r + "-col-" + inp_c).focus();
                    }
                    break;
                case 39:
                    /* arrow right */
                    if (n_r_c <= colls) {
                        $('#' + main_class.id + "-row-" + inp_r + "-col-" + n_r_c).focus();
                    } else {
                        $('#glbColls').val(n_r_c);
                        main_class.add_coll(main_class, n_r_c);

                        $('#' + main_class.id + "-row-" + inp_r + "-col-" + n_r_c).focus();

                    }
                    break;
                case 46:
                    /* delete */
                    $(this).val('');
                    break;
                case 13:
                    /* return/enter */
                    if (n_d_r <= rows) {
                        $('#' + main_class.id + "-row-" + n_d_r + "-col-" + inp_c).focus();
                    } else {
                        $('#glbRows').val(n_d_r);
                        main_class.add_row(main_class, n_d_r)

                        $('#' + main_class.id + "-row-" + n_d_r + "-col-" + inp_c).focus();
                    }
                    break;
                case 40:
                    /* arrow down */
                    if (n_d_r <= rows) {
                        $('#' + main_class.id + "-row-" + n_d_r + "-col-" + inp_c).focus();
                    } else {
                        if (n_r_c <= colls)
                            $('#' + main_class.id + "-row-" + 1 + "-col-" + n_r_c).focus();
                    }
                    break;

                default:
                    return;
            }
            e.preventDefault();
        });
    }

    add_row(main_class, r) {
        var tbody = this.table.find('tbody');
        var row_data = $("<tr/>");
        var r_num = $("<th/>").text(r);
        row_data.append(r_num);
        var colls = int($('#glbColls').val());
        var rows = int($('#glbRows').val());
        globaldata[currentID]['data'][r] = [];
        for (var c = 1; c <= colls; c++) {
            // var td = $("<td/>");
            globaldata[currentID]['data'][r][c] = '';
            var inpt = $("<td/>", { id: main_class.id + "-row-" + r + "-col-" + c, r: r, c: c, class: 'inputx', contenteditable: 'true' });
            main_class.add_key_event(main_class, inpt);
            // td.append(inpt);
            row_data.append(inpt);
        }
        tbody.append(row_data);
    }

    add_coll(main_class, c) {
        var thead = main_class.table.find('thead');
        var colls = int($('#glbColls').val());
        var rows = int($('#glbRows').val());
        var row_head = thead.find('tr');
        globaldata[currentID]['colls'][c] = i_to_coll(c - 1);
        var th = $("<th/>", { id: main_class.id + "-col-" + c });
        var the_div = $("<div/>", { class: "relative" });
        var the_spn = $("<span/>", { class: "colHeader" }).text(i_to_coll(c - 1));
        // var the_sub_div = $("<div/>", { class: "manualColumnResizer", rel: c });
        // the_sub_div.on('dblclick', function() {
        //     var min = 50;
        //     var size_new = 0;
        //     var c = main_class.int($(this).attr('rel'));
        //     for (var r = 1; r <= rows; r++) {
        //         var size_tmp = $("#" + main_class.id + "-row-" + r + "-col-" + c).val().length;
        //         if (size_tmp > size_new) {
        //             size_new = size_tmp;
        //         }
        //     }

        //     var ne_th = $("#" + main_class.id + "-col-" + c);
        //     var fontSize = parseInt(ne_th.css('font-size'));
        //     size_new = size_new * fontSize;
        //     if (size_new > min) {


        //         ne_th.width(size_new + 'px')
        //     }

        // });
        the_div.append(the_spn);
        // the_div.append(the_sub_div);
        th.append(the_div);
        row_head.append(th);
        var tbody = main_class.table.find('tbody');
        tbody.find('tr').each(function(index, tr) {
            var r = parseInt(index) + 1;
            globaldata[currentID]['data'][r][c] = '';
            // var td = $("<td/>");
            var inpt = $("<td/>", { id: main_class.id + "-row-" + r + "-col-" + c, r: r, c: c, class: 'inputx', contenteditable: 'true' });
            main_class.add_key_event(main_class, inpt);
            // td.append(inpt);
            $(tr).append(inpt);
        });
    }

    create() {
        currentID = uuidv();
        globaldata[currentID] = {};
        globaldata[currentID]['colls'] = [];
        globaldata[currentID]['data'] = [];
        this.targetEl.prepend(this.table);
        var thead = this.table.find('thead');
        var row_head = $("<tr/>");
        var main_class = this;
        var colls = int($('#glbColls').val());
        var rows = int($('#glbRows').val());
        row_head.append($("<th/>", { class: "rowHeader" }));
        for (var c = 1; c <= colls; c++) {
            globaldata[currentID]['colls'][c] = i_to_coll(c - 1);
            var th = $("<th/>", { id: this.id + "-col-" + c });
            var the_div = $("<div/>", { class: "relative" });
            var the_spn = $("<span/>", { class: "colHeader" }).text(i_to_coll(c - 1));
            // var the_sub_div = $("<div/>", { class: "manualColumnResizer", rel: c });
            // the_sub_div.on('dblclick', function() {
            //     var min = 50;
            //     var size_new = 0;
            //     var c = main_class.int($(this).attr('rel'));
            //     var ne_th = $("#" + main_class.id + "-col-" + c);
            //     var fontSize = 50;
            //     for (var r = 1; r <= rows; r++) {
            //         var size_tmp = $("#" + main_class.id + "-row-" + r + "-col-" + c).val().length;
            //         if (size_tmp > size_new) {
            //             size_new = size_tmp;
            //             fontSize = parseInt($("#" + main_class.id + "-row-" + r + "-col-" + c).prop('scrollWidth'));
            //         }
            //     }
            //     //var fontSize = parseInt(ne_th.css('font-size'));
            //     size_new = fontSize;
            //     if (size_new > min) {


            //         ne_th.width(size_new + 'px')
            //     }

            // });
            the_div.append(the_spn);
            // the_div.append(the_sub_div);
            th.append(the_div);
            row_head.append(th);
        }

        thead.prepend(row_head);

        var tbody = this.table.find('tbody');
        for (var r = 1; r <= rows; r++) {
            this.add_row(main_class, r);

        }

    }


}