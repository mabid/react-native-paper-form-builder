import {
  Appbar,
  Button,
  DarkTheme,
  DefaultTheme,
  List,
  Provider,
  Surface,
  Switch,
  ThemeProvider,
  Title,
  useTheme,
} from 'react-native-paper';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import FormBuilder from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

function App() {
  const [nightMode, setNightmode] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const form = useForm({
    defaultValues: {
      name: 'Test User',
      email: 'test@test.com',
      password: '12345678',
      gender: 'male',
      city: 1,
      terms: false,
      showNotifications: true,
      rememberMe: true,
    },
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('form data', data);
  });

  const onReset = () => {
    form.reset({
      name: '',
      email: '',
      password: '',
      gender: '',
      city: '',
    });
  };

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <Surface style={{flex: 1}}>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: nightMode
                ? 'transparent'
                : DefaultTheme.colors.primary,
            }}
          />
          <SafeAreaView style={{flex: 1}}>
            <Appbar.Header>
              <Appbar.Content title="React Native Paper Form Builder" />
              <Appbar.Action
                icon={nightMode ? 'brightness-7' : 'brightness-3'}
                onPress={() => setNightmode(!nightMode)}
              />
            </Appbar.Header>
            <ScrollView
              style={{flex: 1, padding: 20}}
              keyboardShouldPersistTaps={'handled'}>
              <List.Item
                title={'Custom Input'}
                right={(props) => (
                  <Switch
                    {...props}
                    value={showCustomInput}
                    color={
                      nightMode
                        ? DarkTheme.colors.primary
                        : DefaultTheme.colors.primary
                    }
                    onValueChange={(value) => setShowCustomInput(value)}
                  />
                )}
              />

              <Title style={{textAlign: 'center'}}>Form Builder</Title>
              <View style={{height: 20}} />
              <FormBuilder
                CustomInput={showCustomInput && CustomTextInput}
                formConfigArray={[
                  {
                    name: 'name',
                    type: 'input',
                    variant: 'outlined',
                    label: 'Name',
                    rules: {
                      required: {
                        value: true,
                        message: 'Name is required',
                      },
                    },
                    textInputProps: {
                      keyboardType: 'default',
                    },
                  },
                  {
                    name: 'email',
                    type: 'input',
                    variant: 'outlined',
                    label: 'Email Address',
                    rules: {
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      pattern: {
                        value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                        message: 'Email is invalid',
                      },
                    },
                    textInputProps: {
                      keyboardType: 'email-address',
                      autoCapitalize: 'none',
                    },
                  },
                  {
                    name: 'password',
                    type: 'input',
                    variant: 'outlined',
                    label: 'Password',
                    rules: {
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                      minLength: {
                        value: 8,
                        message: 'Password should be atleast 8 characters',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Password should be between 8 and 30 characters',
                      },
                    },
                    textInputProps: {
                      keyboardType: 'default',
                      secureTextEntry: true,
                    },
                  },
                  {
                    name: 'gender',
                    type: 'select',
                    options: [
                      {
                        label: 'Male',
                        value: 'male',
                      },
                      {
                        label: 'Female',
                        value: 'female',
                      },
                    ],
                    variant: 'outlined',
                    label: 'Gender',
                    rules: {
                      required: {
                        value: true,
                        message: 'Gender is required',
                      },
                    },
                  },
                  {
                    name: 'city',
                    type: 'autocomplete',
                    options: [
                      {
                        label: 'Lucknow',
                        value: 1,
                      },
                      {
                        label: 'Noida',
                        value: 2,
                      },
                      {
                        label: 'Delhi',
                        value: 3,
                      },
                      {
                        label: 'Bangalore',
                        value: 4,
                      },
                      {
                        label: 'Pune',
                        value: 5,
                      },
                      {
                        label: 'Mumbai',
                        value: 6,
                      },
                      {
                        label: 'Ahmedabad',
                        value: 7,
                      },
                      {
                        label: 'Patna',
                        value: 8,
                      },
                    ],
                    variant: 'outlined',
                    label: 'City',
                    rules: {
                      required: {
                        value: true,
                        message: 'City is required',
                      },
                    },
                  },
                  {
                    name: 'showNotifications',
                    type: 'switch',
                    label: 'Enable Push Notifications',
                  },
                  {
                    name: 'rememberMe',
                    type: 'radio',
                    label: 'Remember Me',
                  },
                  {
                    name: 'terms',
                    type: 'checkbox',
                    label: (
                      <Text>
                        Accept{' '}
                        <Text
                          style={{
                            color: nightMode
                              ? DarkTheme.colors.primary
                              : DefaultTheme.colors.primary,
                          }}
                          onPress={() =>
                            Linking.openURL(
                              'https://github.com/fateh999/react-native-paper-form-builder',
                            )
                          }>
                          Terms & Conditions
                        </Text>
                      </Text>
                    ),
                    rules: {
                      pattern: {
                        value: /true/,
                        message: 'You need to accept Terms & Conditions',
                      },
                    },
                  },
                ]}
                form={form}>
                <View style={{height: 20}} />
                <Button
                  contentStyle={{height: 50}}
                  mode={'contained'}
                  onPress={onSubmit}>
                  Submit
                </Button>
                <View style={{height: 20}} />
                <Button
                  contentStyle={{height: 50}}
                  mode={'outlined'}
                  onPress={onReset}>
                  Reset
                </Button>
              </FormBuilder>
              <View style={{height: 40}} />
            </ScrollView>
            {/* <KeyboardSpacer /> */}
          </SafeAreaView>
        </Surface>
      </ThemeProvider>
    </Provider>
  );
}

function CustomTextInput(props) {
  const Theme = useTheme();
  const {error} = props;

  return (
    <View
      style={{
        backgroundColor: Theme.colors.surface,
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: error ? Theme.colors.error : Theme.colors.placeholder,
      }}>
      <TextInput
        {...props}
        style={{
          color: Theme.colors.onSurface,
          paddingLeft: 25,
          paddingRight: 25,
          height: 56,
          ...props.style,
        }}
        placeholder={props.label}
        placeholderTextColor={Theme.colors.placeholder}
      />
    </View>
  );
}

function SimpleCustomTextInput(props) {
  const {error, label, style} = props;

  return (
    <TextInput
      placeholder={label}
      {...props}
      style={{
        color: 'black',
        height: 56,
        borderBottomWidth: 2,
        borderBottomColor: error ? 'red' : 'grey',
        ...style,
      }}
    />
  );
}

export default App;
