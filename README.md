# HR Flow

HR Flow System is a structured process that manages employee-related tasks throughout their lifecycle in an organization. It streamlines HR operations, ensuring efficiency, compliance, and a positive employee experience.

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Demo

Production: http://13.37.211.34/

Staging: http://15.188.49.159/

To login to the system on staging server you can use the following credentials:

As an HR:

    email:  jewell68@example.net

    password: password

As an Employee:

    Email: cartwright.buster@example.net

    password: password

## Features

- Employee Management
- Attendance Tracking
- Leave Management
- Payroll Integration
  And many more that you can discover while scrolling through the system!

![HR Flow Logo](https://github.com/HoussienZed/HR_system/blob/main/Client/src/assets/logo.png?raw=true)
