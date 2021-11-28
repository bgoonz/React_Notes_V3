import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          timeAgo="Today at 4:45PM"
          content="Nice blog post"
          avatar={faker.image.image()}
        />
      </ApprovalCard>

      <CommentDetail
        author="Alex"
        timeAgo="Today at 2:00AM"
        content="I like the subject"
        avatar={faker.image.image()}
      />
      <CommentDetail
        author="Jane"
        timeAgo="Yesterday at 5:00PM"
        content="I like the writing"
        avatar={faker.image.image()}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
