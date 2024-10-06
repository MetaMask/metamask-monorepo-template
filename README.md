<<<<<<< HEAD
# metamask-monorepo-template

TODO
=======
# Core Monorepo

This monorepo is a collection of packages used across multiple MetaMask clients (e.g. [`metamask-extension`](https://github.com/MetaMask/metamask-extension/), [`metamask-mobile`](https://github.com/MetaMask/metamask-mobile/)).

## Modules

This repository contains the following packages [^fn1]:

<!-- start package list -->

- [`@metamask/metamask-module-template`](packages/metamask-module-template)

<!-- end package list -->

Or, in graph form [^fn1]:

<!-- start dependency graph -->

```mermaid
%%{ init: { 'flowchart': { 'curve': 'bumpX' } } }%%
graph LR;
linkStyle default opacity:0.5
  accounts_controller --> base_controller;
  accounts_controller --> keyring_controller;
  address_book_controller --> base_controller;
  address_book_controller --> controller_utils;
  announcement_controller --> base_controller;
  approval_controller --> base_controller;
  assets_controllers --> accounts_controller;
  assets_controllers --> approval_controller;
  assets_controllers --> base_controller;
  assets_controllers --> controller_utils;
  assets_controllers --> keyring_controller;
  assets_controllers --> network_controller;
  assets_controllers --> polling_controller;
  assets_controllers --> preferences_controller;
  chain_controller --> base_controller;
  composable_controller --> base_controller;
  composable_controller --> json_rpc_engine;
  ens_controller --> base_controller;
  ens_controller --> controller_utils;
  ens_controller --> network_controller;
  eth_json_rpc_provider --> json_rpc_engine;
  gas_fee_controller --> base_controller;
  gas_fee_controller --> controller_utils;
  gas_fee_controller --> network_controller;
  gas_fee_controller --> polling_controller;
  json_rpc_middleware_stream --> json_rpc_engine;
  keyring_controller --> base_controller;
  keyring_controller --> message_manager;
  logging_controller --> base_controller;
  logging_controller --> controller_utils;
  message_manager --> base_controller;
  message_manager --> controller_utils;
  name_controller --> base_controller;
  name_controller --> controller_utils;
  network_controller --> base_controller;
  network_controller --> controller_utils;
  network_controller --> eth_json_rpc_provider;
  network_controller --> json_rpc_engine;
  notification_controller --> base_controller;
  notification_services_controller --> base_controller;
  notification_services_controller --> controller_utils;
  notification_services_controller --> keyring_controller;
  notification_services_controller --> profile_sync_controller;
  permission_controller --> base_controller;
  permission_controller --> controller_utils;
  permission_controller --> json_rpc_engine;
  permission_controller --> approval_controller;
  permission_log_controller --> base_controller;
  permission_log_controller --> json_rpc_engine;
  phishing_controller --> base_controller;
  phishing_controller --> controller_utils;
  polling_controller --> base_controller;
  polling_controller --> controller_utils;
  polling_controller --> network_controller;
  preferences_controller --> base_controller;
  preferences_controller --> controller_utils;
  preferences_controller --> keyring_controller;
  profile_sync_controller --> base_controller;
  queued_request_controller --> base_controller;
  queued_request_controller --> controller_utils;
  queued_request_controller --> json_rpc_engine;
  queued_request_controller --> network_controller;
  queued_request_controller --> selected_network_controller;
  rate_limit_controller --> base_controller;
  selected_network_controller --> base_controller;
  selected_network_controller --> json_rpc_engine;
  selected_network_controller --> network_controller;
  selected_network_controller --> permission_controller;
  signature_controller --> approval_controller;
  signature_controller --> base_controller;
  signature_controller --> controller_utils;
  signature_controller --> keyring_controller;
  signature_controller --> logging_controller;
  signature_controller --> message_manager;
  transaction_controller --> accounts_controller;
  transaction_controller --> approval_controller;
  transaction_controller --> base_controller;
  transaction_controller --> controller_utils;
  transaction_controller --> gas_fee_controller;
  transaction_controller --> network_controller;
  transaction_controller --> eth_json_rpc_provider;
  user_operation_controller --> approval_controller;
  user_operation_controller --> base_controller;
  user_operation_controller --> controller_utils;
  user_operation_controller --> gas_fee_controller;
  user_operation_controller --> keyring_controller;
  user_operation_controller --> network_controller;
  user_operation_controller --> polling_controller;
  user_operation_controller --> transaction_controller;
```

<!-- end dependency graph -->

Refer to individual packages for usage instructions.

## Learn more

For instructions on performing common development-related tasks, see [contributing to the monorepo](./docs/contributing.md).

[^fn1]: The package list and dependency graph should be programmatically generated by running `yarn update-readme-content`.
>>>>>>> 1daea87 (Initial commit: Clean slate for monorepo template)
