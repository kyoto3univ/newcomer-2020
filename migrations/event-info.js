module.exports = function (migration) {
  const eventInfo = migration
    .createContentType("EventInfo")
    .name("イベント情報")
    .description("")
    .displayField("title");

  eventInfo
    .createField("title")
    .name("タイトル")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 48,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  eventInfo
    .createField("orgs")
    .name("団体名")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 16,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  eventInfo
    .createField("date")
    .name("日時")
    .type("Date")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  eventInfo
    .createField("content")
    .name("内容")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  eventInfo
    .createField("images")
    .name("画像")
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
          linkMimetypeGroup: ["image"],
        },
      ],

      linkType: "Asset",
    });

  eventInfo.changeFieldControl("title", "builtin", "singleLine", {});
  eventInfo.changeFieldControl("orgs", "builtin", "singleLine", {});

  eventInfo.changeFieldControl("date", "builtin", "datePicker", {
    ampm: "24",
    format: "timeZ",
  });

  eventInfo.changeFieldControl("content", "builtin", "multipleLine", {});
  eventInfo.changeFieldControl("images", "builtin", "assetGalleryEditor", {});
};
