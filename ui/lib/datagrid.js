(function($) {
    $.fn.c4tgrid = function() {
        var id = $(this).attr("id");
        var args = [];
        var $rows = 50;
        var colls = 26;
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var act = args.shift();
        $(this).addClass('c4tgrid')

        var $table = $('<table class="c4tCore"><thead></thead><tbody></tbody></table>');

        function i_to_coll(i) {
            if (i < 26)
                return String.fromCharCode(i + 65);
            else
                return String.fromCharCode(i / 26 + 64) + String.fromCharCode(i % 26 + 65);
        }

        if (act == "create") {
            console.log("I'll create it");
            $(this).prepend($table);
            var $thead = $table.find('thead');
            var row_head = $("<tr/>");
            row_head.append($("<th/>", { class: "rowHeader" }));
            for (var c = 0; c < colls; c++) {
                var th = $("<th/>", { id: id + "-col-" + c });
                var the_div = $("<div/>", { class: "relative" });
                var the_spn = $("<span/>", { class: "colHeader" }).text(i_to_coll(c));
                var the_sub_div = $("<div/>", { class: "manualColumnResizer", rel: c });
                the_div.append(the_spn);
                the_div.append(the_sub_div);
                th.append(the_div);
                row_head.append(th);
            }
            $thead.prepend(row_head);

            var $tbody = $table.find('tbody');
            for (var r = 1; r <= $rows; r++) {
                var row_data = $("<tr/>");
                var r_num = $("<th/>").text(r);
                row_data.append(r_num);
                for (var c = 0; c < colls; c++) {
                    var td = $("<td/>");
                    var $inpt = $("<input/>", { id: id + "-row-" + r + "-col-" + c, r: r, c: c });
                    $inpt.keydown(function(e) {
                        var inp_r = $(this).attr('r');
                        var inp_c = $(this).attr('c');
                        var n_l_c = inp_c - 1;
                        var n_r_c = inp_c + 1;
                        var n_u_r = inp_r - 1;
                        var n_d_r = inp_r + 1;
                        switch (e.which) {
                            case 37:
                                /* arrow left */
                                if (n_l_c >= 0) {
                                    $('#' + id + "-row-" + inp_r + "-col-" + n_c).focus();
                                }
                                break;
                            case 9:
                                /* tab */
                                break;
                            case 38:
                                /* arrow up */
                                break;

                            case 39:
                                /* arrow right */
                                break;
                            case 46:
                                /* delete */
                                break;
                            case 13:
                                /* return/enter */
                                break;
                            case 40:
                                /* arrow down */
                                break;

                            default:
                                return;
                        }
                        e.preventDefault();
                    });
                    td.append($inpt);
                    row_data.append(td);
                }
                $tbody.append(row_data);
            }

        }

        return this;
    };
}(jQuery));