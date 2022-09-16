import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";

function TinyMCE({ editor, setEditor, type = "content" }) {
  const { t } = useTranslation("bank");
  const changeEditor = (value) => {
    if (type === "answer")
      setEditor((pre) => {
        return pre.map((answer) => {
          if (answer.id === editor.id) {
            return { id: answer.id, content: value };
          }
          return answer;
        });
      });
    else {
      setEditor(value);
    }
  };
  return (
    <div>
      <Editor
        initialValue={type === "answer" ? editor.content : editor}
        onBlur={(e) => changeEditor(e.target.getContent())}
        apiKey="b3m4owtz9mxa6zl1otn948snen4m5np54rm3w5s6a5zny4kz"
        cloudChannel="5-stable"
        init={{
          statusbar: false,
          menubar: false,
          inline: true,
          placeholder: t("enter_content", { ns: "bank" }),
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste help autoresize",
          ],
          images_upload_url: "postAcceptor.php",
          automatic_uploads: false,
          toolbar_mode: "sliding",
          toolbar:
            " bold italic underline | forecolor backcolor casechange " +
            " permanentpen formatpainter | numlist bullist checklist | " +
            " image media pageembed template link |alignleft aligncenter alignright alignjustify |  ",
        }}
      />
    </div>
  );
}

export default TinyMCE;
