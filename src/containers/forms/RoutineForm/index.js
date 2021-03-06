import React, { Component } from 'react';

import GenericForm from '../../../components/forms/GenericForm';
import {
  djangoErrorResponseParser,
  withStore,
} from '../../../components/helpers';

const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    tooltip:
      'Give a name suggestive name to the routine so it will recognize it later.',
  },
  {
    name: 'file',
    type: 'file',
    label: 'File',
    tooltip:
      'Choose the script that will be executed when this routine is triggered.',
  },
];

class RoutineForm extends Component {
  state = {
    id: this.props.id || null,
    name: this.props.name || '',
    file: '',
    fileObject: null,
    error: {},
  };

  handleChange(event) {
    const {
      target: { value, name, files, type },
    } = event;

    if (type === 'file') {
      return this.setState({
        [name]: value,
        fileObject: files[0],
      });
    }

    return this.setState({
      [name]: value,
    });
  }

  async handleSubmitForm(event) {
    event.preventDefault();

    try {
      const {
        store: { routineStore },
        closeModal,
      } = this.props;

      const response = await routineStore.upload({
        file: this.state.fileObject,
      });

      if (this.state.id) {
        await routineStore.update({
          name: this.state.name,
          file: response.data.id,
        });

        return closeModal();
      }

      await routineStore.add({
        name: this.state.name,
        file: response.data.id,
      });

      return this.props.history && this.props.history.push('/routines');
    } catch (error) {
      console.log(djangoErrorResponseParser);
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  async handleDelete() {
    try {
      const {
        store: { routineStore },
        closeModal,
      } = this.props;
      const { id } = this.state;

      await routineStore.delete(id);

      return closeModal();
    } catch (error) {
      return this.setState({
        error: djangoErrorResponseParser(error),
      });
    }
  }

  render() {
    return (
      <GenericForm
        fields={fields}
        handleSubmitForm={event => this.handleSubmitForm(event)}
        handleChange={event => this.handleChange(event)}
        entity={this.state}
        handleDelete={() => this.handleDelete()}
      />
    );
  }
}

export default withStore(RoutineForm);
