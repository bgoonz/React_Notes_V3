import { NoteConsumer } from '../components/NoteProvider';

export default function withContextValues(Component) {
  return function (props) {
    return <NoteConsumer>{values => <Component {...props} contextValues={values} />}</NoteConsumer>;
  };
};
