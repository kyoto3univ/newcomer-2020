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
      {
        in: [1, 2, 3, 4, 5, 6, 7],
      },
    ])
    .disabled(false)
    .omitted(false);

  classInfo
    .createField("type")
    .name("授業種別")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        in: ["三大学合同", "教養科目", "選択必修等"],
      },
    ])
    .disabled(false)
    .omitted(false);

  classInfo
    .createField("summary")
    .name("概要")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 250,
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
    .type("Text")
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 250,
        },
      },
    ])
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
    .createField("officialUrl")
    .name("公式シラバスURL")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Symbol",

      validations: [
        {
          regexp: {
            pattern:
              "^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$",
          },
        },
      ],
    });

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

  classInfo.changeFieldControl("time", "builtin", "dropdown", {
    helpText: "7はその他",
  });

  classInfo.changeFieldControl("type", "builtin", "dropdown", {});

  classInfo.changeFieldControl("summary", "builtin", "multipleLine", {
    helpText: "シラバスなどから引用する",
  });

  classInfo.changeFieldControl("teachers", "builtin", "tagEditor", {});
  classInfo.changeFieldControl("comment", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("textbook", "builtin", "singleLine", {});
  classInfo.changeFieldControl("evaluation", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("notes", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("officialUrl", "builtin", "tagEditor", {});

  classInfo.changeFieldControl("reactions", "builtin", "entryLinksEditor", {
    bulkEditing: false,
  });
};
