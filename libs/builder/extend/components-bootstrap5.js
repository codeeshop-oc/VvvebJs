Vvveb.ComponentsGroup['Bootstrap 5'].push("php/trending_posts_gridrow")

const trending_posts_gridcolumn_html = `<div class="trending_posts_column col-sm-4" data-module="php/trending_posts_gridcolumn"><h3>col-sm-4</h3></div>`;

Vvveb.Components.extend("_base", "php/trending_posts_gridcolumn", {
    name: "Trending Posts Column",
    image: "icons/grid_column.svg",
    classes: ["trending_posts_column"],
    html: `${trending_posts_gridcolumn_html}`,
    properties: [{
        name: "Column",
        key: "column",
        inline:false,
        inputtype: GridInput,
        data: {hide_remove:true},

        beforeInit: function(node) {
            _class = node.getAttribute("class");

            let reg = /col(-[^-\$ ]*)?-?(\d+)?/g;
            let match;

            while ((match = reg.exec(_class)) != null) {
                let key = "col" + ((match[1] != undefined) ? "_" + match[1].replace('-','') : "");
                this.data[key] = match[2] ?? '';
            }
        },

        onChange: function(node, value, input) {
            let _class = node.getAttribute("class");

            //remove previous breakpoint column size
            _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
            //add new column size
            if (value) _class +=  ' ' + input.name + '-' + value;
            node.setAttribute("class", _class);

            return node;
        },
    }]
});

Vvveb.Components.extend("_base", "php/trending_posts_gridrow", {
    name: "Trending Posts Row",
    image: "icons/grid_row.svg",
    classes: ["trending_posts_gridrow"],
    html: `<div class="trending_posts_gridrow row" data-module="php/trending_posts_gridrow">
        ${trending_posts_gridcolumn_html}
        ${trending_posts_gridcolumn_html}
        ${trending_posts_gridcolumn_html}
    </div>
    `,
    children :[{
        name: "php/trending_posts_gridcolumn",
        classes: ["trending_posts_column"],
    }],
    beforeInit: function (node) {
        properties = [];
        let i = 0;
        let j = 0;

        node.querySelectorAll('[class*="col-"],.col').forEach(el => {
            _class = el.getAttribute("class");

            let reg = /col(-[^-\$ ]*)?-?(\d+)?/g;
            let match;
            let data = {};

            while ((match = reg.exec(_class)) != null) {
                let key = "col" + ((match[1] != undefined) ? "_" + match[1].replace('-','') : "");
                data[key] = match[2] ?? '';
            }

            i++;
            properties.push({
                name: "Column " + i,
                key: "column" + i,
                //index: i - 1,
                columnNode: el,
                col:12,
                inline:false,
                inputtype: GridInput,
                data: data,
                onChange: function(node, value, input) {

                    let column = this.columnNode;

                    //if remove button is clicked remove column and render row properties
                    if (input.nodeName == 'BUTTON') {
                        column.remove();
                        Vvveb.Components.render("php/trending_posts_gridrow");
                        return node;
                    }

                    //if select input then change column class
                    _class = column.getAttribute("class");

                    //remove previous breakpoint column size
                    _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
                    //add new column size
                    if (value) _class +=  ' ' + input.name + '-' + value;
                    column.setAttribute("class", _class);

                    return node;
                },
            });
        });

        //remove all column properties
        this.properties = this.properties.filter(function(item) {
            return item.key.indexOf("column") === -1;
        });

        //add remaining properties to generated column properties, put first 2 align properties first
        this.properties = this.properties.slice(0,4).concat(properties, this.properties.slice(4));

        return node;
    },

    properties: [{
        name: "Direction",
        key: "direction",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "flex-row", "flex-row-reverse", "flex-column", "flex-column-reverse"],
        inputtype: RadioButtonInput,
        data: {
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "Default",
                checked:true,
            },{
                value: "flex-row",
                //text: "Left",
                title: "Row - horizontal",
                icon:"la la-arrow-right",
                checked:false,
            },{
                value: "flex-column",
                //text: "Center",
                title: "Column - vertical",
                icon:"la la-arrow-down",
                checked:false,
            },{
                value: "flex-row-reverse",
                //text: "Right",
                title: "Row - reversed",
                icon:"la la-arrow-left",
                checked:false,
            },{
                value: "flex-column-reverse",
                //text: "Center",
                title: "Column - reversed",
                icon:"la la-arrow-up",
                checked:false,
            }],
        },
    },{
        name: "Vertical align",
        key: "vertical-align",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "align-items-start", "align-items-center", "align-items-end", "align-items-baseline", "align-items-stretch"],
        inputtype: RadioButtonInput,
        data: {
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            },{
                value: "align-items-start",
                //text: "Left",
                title: "Start",
                icon:"la la-align-left",
                checked:false,
            },{
                value: "align-items-center",
                //text: "Center",
                title: "Center",
                icon:"la la-align-center",
                checked:false,
            },{
                value: "align-items-end",
                //text: "Right",
                title: "End",
                icon:"la la-align-right",
                checked:false,
            },{
                value: "align-items-baseline",
                title: "Baseline",
                icon:"la la-indent",
                checked:false,
            },{
                value: "align-items-stretch",
                title: "Stretch",
                icon:"la la-align-justify",
                checked:false,
            }],
        },
    },{
        name: "Horizontal align",
        key: "horizontal-align",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "justify-content-start", "justify-content-center", "justify-content-end", "justify-content-around", "justify-content-between", "justify-content-evenly"],
        inputtype: RadioButtonInput,
        data: {
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            },{
                value: "justify-content-start",
                //text: "Left",
                title: "Start",
                icon:"la la-align-left",
                checked:false,
            },{
                value: "justify-content-center",
                //text: "Center",
                title: "Center",
                icon:"la la-align-center",
                checked:false,
            },{
                value: "justify-content-end",
                //text: "Right",
                title: "End",
                icon:"la la-align-right",
                checked:false
            },{
                value: "justify-content-around",
                //text: "Left",
                title: "Around",
                icon:"la la-indent",
                checked:false,
            },{
                value: "justify-content-between",
                //text: "Center",
                title: "Between",
                icon:"la la-outdent",
                checked:false,
            },{
                value: "justify-content-evenly",
                //text: "Right",
                title: "Evenly",
                icon:"la la-align-justify",
                checked:false,
            }],
        },
    },{
        name: "Wrap",
        key: "wrap",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "flex-wrap", "flex-nowrap"],
        inputtype: RadioButtonInput,
        data: {
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            },{
                value: "flex-wrap",
                //text: "Left",
                title: "Wrap",
                icon:"la la-undo",
                checked:false,
            },{
                value: "flex-nowrap",
                //text: "Center",
                title: "No wrap",
                icon:"la la-arrow-right",
                checked:false,
            }],
        },
    },{
        name: "Column",
        key: "column1",
        inputtype: GridInput
    },{
        name: "Column",
        key: "column1",
        inline:true,
        col:12,
        inputtype: GridInput
    },{
        name: "",
        key: "addChild",
        inputtype: ButtonInput,
        data: {text:"Add column", icon:"la la-plus"},
        onChange: function(node)
        {
             node.append(generateElements(`${trending_posts_gridcolumn_html}`)[0]);

             //render component properties again to include the new column inputs
             Vvveb.Components.render("php/trending_posts_gridrow");

             // reload navigator
             // Vvveb.TreeList.loadComponents();

             return node;
        }
    }]
});



// Vvveb.Components.extend("_base", "_base", {
//     name: "Base Component with Typography",
//     properties: [
//         ...Vvveb.Components._components._base.properties, // keep existing
//         {
//             name: "Font sizeww",
//             key: "font-size2",
//             htmlAttr: "style",
//             sort: base_sort++,
//             section: style_section,
//             col:6,
//             inline:false,
//             inputtype: CssUnitInput
//             // key: "font_size",
//             // inputtype: RangeInput,
//             // name: "Font size",
//             // data: { min: 10, max: 100, step: 1 },
//             // onChange: function(node, value) {
//             //     node.style.fontSize = value + "px";
//             //     return node;
//             // }
//         }
//     ]
// });
