module.exports = function (migration) {
  const classReaction = migration
    .createContentType("ClassReaction")
    .name("授業の感想")
    .description("")
    .displayField("content");
  classReaction
    .createField("content")
    .name("内容")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  classReaction.changeFieldControl("content", "builtin", "multipleLine", {});
};
