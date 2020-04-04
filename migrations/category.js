module.exports = function (migration) {
  const category = migration
    .createContentType("Category")
    .name("カテゴリ")
    .description("")
    .displayField("name");
  category
    .createField("name")
    .name("名前")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  category
    .createField("priority")
    .name("優先度")
    .type("Integer")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  category.changeFieldControl("name", "builtin", "singleLine", {});
  category.changeFieldControl("priority", "builtin", "numberEditor", {});
};
