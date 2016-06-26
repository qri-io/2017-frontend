ace.define("ace/theme/qri",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-qri";
exports.cssText = ".ace-qri .ace_gutter {\
background: #2A3439;\
color: #40515D\
}\
.ace-qri .ace_print-margin {\
width: 0;\
background: #2A2E2E\
}\
.ace-qri {\
background-color: #2A3439;\
color: #DFE2CE\
}\
.ace-qri .ace_cursor {\
color: #F8F8F0\
}\
.ace-qri .ace_scroller {\
background-color: #2A3439\
}\
.ace-qri .ace_marker-layer .ace_selection {\
background: #40515D\
}\
.ace-qri.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-qri .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-qri .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #2A3439\
}\
.ace-qri .ace_marker-layer .ace_active-line {\
background: rgba(0,0,0,0.25)\
}\
.ace-qri .ace_gutter-active-line {\
background-color: #272727\
}\
.ace-qri .ace_marker-layer .ace_selected-word {\
border: 1px solid #2A3439\
}\
.ace-qri .ace_invisible {\
color: #52524d\
}\
.ace-qri .ace_entity.ace_name.ace_tag,\
.ace-qri .ace_keyword,\
.ace-qri .ace_meta.ace_tag,\
.ace-qri .ace_storage {\
color: #FA009B\
}\
.ace-qri .ace_punctuation,\
.ace-qri .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-qri .ace_constant.ace_character,\
.ace-qri .ace_constant.ace_language,\
.ace-qri .ace_constant.ace_numeric,\
.ace-qri .ace_constant.ace_other {\
color: #AE81FF\
}\
.ace-qri .ace_invalid {\
color: #F8F8F0;\
background-color: #FA009B\
}\
.ace-qri .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-qri .ace_support.ace_constant,\
.ace-qri .ace_support.ace_function {\
color: #66D9EF\
}\
.ace-qri .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-qri .ace_storage.ace_type,\
.ace-qri .ace_support.ace_class,\
.ace-qri .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.ace-qri .ace_entity.ace_name.ace_function,\
.ace-qri .ace_entity.ace_other,\
.ace-qri .ace_entity.ace_other.ace_attribute-name,\
.ace-qri .ace_variable {\
color: #A6E22E\
}\
.ace-qri .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-qri .ace_string {\
color: #E6DB74\
}\
.ace-qri .ace_comment {\
color: #75715E\
}\
.ace-qri .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
