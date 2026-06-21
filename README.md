# Smart Accident Detection System

## Overview

Smart Accident Detection System is an IoT-based safety solution designed for two-wheeler riders. The system detects accidents using an IoT device and automatically sends alerts to predefined contacts, nearby emergency services, and hospitals to enable faster response during critical situations.

The main focus of the system is to quickly notify the rider's family/home contacts during an accident and provide emergency assistance when required.

## Features

* Real-time accident detection using IoT sensors
* Automatic emergency alert generation
* Sends accident notifications to registered contacts
* Helps connect with nearby ambulance and hospitals
* Mobile application support for monitoring and alerts
* Cloud-based data storage and management

## System Workflow

Two-Wheeler Accident
→ IoT Device Detects Impact
→ Data Sent to Backend
→ Accident Verification
→ Emergency Alert Sent
→ Family / Nearby Help Contacted

## Technologies Used

### IoT

* Sensors for accident detection
* Microcontroller-based device
* Real-time data transmission

### Backend

* Supabase
* Database Management
* API Services

### Frontend / Deployment

* Web/Mobile Application
* Vercel Deployment

## Architecture

IoT Device → Supabase Backend → Application → Emergency Contacts / Hospitals

## Purpose

The objective of this project is to reduce emergency response time for two-wheeler accidents by automatically detecting accidents and notifying the right people without depending completely on manual calls.

## Future Enhancements

* GPS-based live location tracking
* AI-based accident severity prediction
* Automatic ambulance integration
* Voice-based emergency assistance
* Wearable device support

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
