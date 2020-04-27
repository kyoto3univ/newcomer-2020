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
    .createField("day")
    .name("曜日")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        in: ["月", "火", "水", "木", "金", "集中"],
      },
    ])
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
    .createField("tags")
    .name("タグ")
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
    .createField("type")
    .name("授業種別(大学名)")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        in: [
          "三大学合同",
          "京都府立医科大学",
          "京都工芸繊維大学",
          "京都府立大学",
        ],
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
          max: 100,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

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
  classInfo.changeFieldControl("day", "builtin", "dropdown", {});

  classInfo.changeFieldControl("time", "builtin", "dropdown", {
    helpText: "7はその他",
  });

  classInfo.changeFieldControl("tags", "builtin", "tagEditor", {});
  classInfo.changeFieldControl("type", "builtin", "dropdown", {});

  classInfo.changeFieldControl("summary", "builtin", "singleLine", {
    helpText:
      "シラバスなどから引用するか、教員の一言を90字程度に良い感じに切り取る",
  });

  classInfo.changeFieldControl("comment", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("teachers", "builtin", "tagEditor", {});
  classInfo.changeFieldControl("textbook", "builtin", "singleLine", {});
  classInfo.changeFieldControl("evaluation", "builtin", "multipleLine", {});
  classInfo.changeFieldControl("notes", "builtin", "multipleLine", {});

  classInfo.changeFieldControl("reactions", "builtin", "entryLinksEditor", {
    bulkEditing: false,
  });
};
