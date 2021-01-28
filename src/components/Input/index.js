import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  font-size: 14px;
  margin-bottom: 25px;
  outline: 0;
  padding: 15px;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <>
      <div>
        <InputBase
          onChange={onChange}
          placeholder={placeholder}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    </>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
