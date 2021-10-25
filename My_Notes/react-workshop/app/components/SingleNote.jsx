import Head from 'next/head';
import Link from 'next/link';

const SingleNote = ({ note }) => {
  return !note
    ? (<p>No Note Found</p>)
    : (
        <>
          <Head>
            <title>{note.title}</title>
          </Head>
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
          <Link href={{
            pathname: '/edit',
            query: {
              id: note._id
            }
          }}><a>Edit Note</a></Link>
        </>
      );
};

export default SingleNote;
