module.exports = function (migration) {
  const classInfo = migration
    .createContentType("ClassInfo")
    .name("授業情報")
    .description("")
    .displayField("title");
  classInfo
    .createField("title")
    .name("授業名")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  classInfo
    .createField("time")
    .name("時限")
    .type("Integer")
    .localized(false)
    .required(true)
    .validations([
      {
        range: {
          min: 1,
          max: 7,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  classInfo
    .createField("teachers")
    .name("担当教員")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Symbol",
      validations: [],
    });

  classInfo
    .createField("comment")
    .name("学生に一言")
    .type("Text")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  classInfo
    .createField("textbook")
    .name("教科書")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  classInfo
    .createField("evaluation")
    .name("成績評価")
    .type("Text")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  classInfo
    .createField("notes")
    .name("注意事項")
    .type("Text")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  classInfo
    .createField("reactions")
    .name("感想")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkContentType: ["ClassReaction"],
        },
      ],

      linkType: "Entry",
    });

  classInfo.changeFieldControl("title", "builtin", "singleLine", {});

  classInfo.changeFieldControl("time", "builtin", "radio", {
    helpText: "7はその他",
  });

  classInfo.changeFieldControl("teachers", "builtin", "tagEditor", {});
  classInfo.changeFieldControl("comment", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("textbook", "builtin", "singleLine", {});
  classInfo.changeFieldControl("evaluation", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("notes", "builtin", "multipleLine", {});

  classInfo.changeFieldControl("reactions", "builtin", "entryLinksEditor", {
    bulkEditing: false,
  });
};
