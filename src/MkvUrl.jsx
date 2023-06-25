import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: ${(props) => (props.simple ? 'static' : 'fixed')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MkvUrl = ({ url, simple }) => {
  const history = useHistory();
  const comp = (
    <Container simple={simple}>
      <h1>{url}</h1>

      <button
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          alert('Copied');
        }}
      >
        Copy
      </button>
      {!simple && <button onClick={() => history.goBack()}>Close</button>}
    </Container>
  );

  if (simple) {
    return comp;
  }

  return createPortal(comp, document.body);
};

export default MkvUrl;
