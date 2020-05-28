import React from "react"
import { Field, reduxForm } from 'redux-form'
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { useIntl, FormattedMessage } from "react-intl"
import "react-google-places-autocomplete/dist/index.min.css"

import renderField from './renderField'
import Title from "@/components/ui/Title"
import validate from "./validate"
import { Colors } from "@/components/layouts/utils/theme"
import Button from "@/components/ui/Button"
import { mq } from "@/components/layouts/utils/base"

const Form = styled.form`
  input {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid ${Colors.silver};
  }
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  ${mq.sm(css`
    flex-direction: row;
  `)}

  button:last-child {
    margin-top: 10px;

    ${mq.sm(css`
      margin-top: 0px;
      margin-left: 10px;
    `)}
  }
`

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  const intl = useIntl()

  return (
    <Form onSubmit={handleSubmit}>
      <Title marginBottom="30px" max="10" min="25" color={Colors.mirage} >
       <FormattedMessage id="wizard.static.question2" />
      </Title>

      <Field 
        name="country"
        type="select"
        component={renderField}
        label={<strong>{intl.formatMessage({ id: "common.country" })}:</strong>}
      />
      <Field 
        name="state" 
        type="select"
        component={renderField}
        label={<strong>{intl.formatMessage({ id: "common.state" })}:</strong>}
      />
      <Field 
        name="city" 
        type="select"
        component={renderField}
        label={<strong>{intl.formatMessage({ id: "common.city" })}:</strong>}
      />
      <Field
        name="postalcode"
        type="text"
        placeholder={intl.formatMessage({ id: "common.postalcode.placeholder"})}
        component={renderField}
        label={<strong>{intl.formatMessage({ id: "common.postalcode" })}:</strong>}
      />

      <ButtonContainer>
        <Button
          stylesType="common"
          backgroundColor="#fedc8c"
          backgroundColorHover={Colors.white}
          callback={previousPage}
        >
          <FormattedMessage id="wizard.previous.button" />
        </Button>
        <Button
          type="submit"
          stylesType="common"
          backgroundColor={Colors.lightGreen}
          backgroundColorHover={Colors.white}
        >
          <FormattedMessage id="wizard.next.button" />
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormSecondPage)
