import anime from 'animejs';
import { debounce } from 'throttle-debounce';

const emojiUrlLookup = {
    celebrate:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+eWF5LWxnPC90aXRsZT4KICAgIDxnIGlkPSJ5YXktbGciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cC0yIj48L2c+CiAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS44OTUzNjUsIDI5LjUwMzY1NCkgcm90YXRlKC00LjAwMDAwMCkgdHJhbnNsYXRlKC0xMS44OTUzNjUsIC0yOS41MDM2NTQpIHRyYW5zbGF0ZSgtNC4xMDQ2MzUsIDE2LjAwMzY1NCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNS4yNjg4NTMwMiwyMC45OTU0NjAxIEwxOC43NjA0OTgxLDUuMDM4MzU5NTQgQzE5LjQ3MzY2MjEsNC4xOTQ4NzIyNyAyMC43MzU1Nzc0LDQuMDg5MjI0NDQgMjEuNTc5MDY0Nyw0LjgwMjM4ODUyIEMyMS44MzYxOTM4LDUuMDE5Nzg5ODEgMjIuMDM0MjcyMyw1LjI5ODU5MTExIDIyLjE1NDkzNyw1LjYxMjk0NTU2IEwyOC4zOTI4MDE3LDIxLjg2Mzc2NjUgQzI4Ljc4ODYzMDcsMjIuODk0OTc2MSAyOC4yNzM1NTI5LDI0LjA1MTgxOTQgMjcuMjQyMzQzNCwyNC40NDc2NDg0IEMyNy4wMDQyNDY1LDI0LjUzOTA0MTcgMjYuNzUwODY2OSwyNC41ODQwNTMxIDI2LjQ5NTg2MDIsMjQuNTgwMjU2NyBMNi43NjYzNTA0LDI0LjI4NjUzNjMgQzUuNjYxOTAzMjksMjQuMjcwMDk0IDQuNzc5OTAxMTIsMjMuMzYxNDMzNiA0Ljc5NjM0MzQzLDIyLjI1Njk4NjUgQzQuODAzMjI4NzksMjEuNzk0NDg5OSA0Ljk3MDIwOTUxLDIxLjM0ODY3NzYgNS4yNjg4NTMwMiwyMC45OTU0NjAxIFoiIGlkPSJQYXRoLTMiIGZpbGw9IiNGRkQxMDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1Ljk5NTk0NSwgMTMuNTQwNDMwKSByb3RhdGUoLTEwLjAwMDAwMCkgdHJhbnNsYXRlKC0xNS45OTU5NDUsIC0xMy41NDA0MzApICI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjcuMDUwNDU5OSwyMi4zNDQ5NTI2IEMyOC4xNTk4NjQ3LDIxLjc0MTY4OTIgMjcuNTIyOTE3OCwxNi44NzkzODY3IDI1Ljg0MDUyMzYsMTEuNzU1Njk3NCBDMjQuMTU4MTI5NSw2LjYzMjAwODExIDIxLjg0MDk1NjIsMi44NjcwNDkzMSAyMC43MzE1NTE0LDMuNDcwMzEyNzUgQzE5LjYyMjE0NjYsNC4wNzM1NzYyIDIwLjE0MDYxOTMsOC44MTY2MTgyOSAyMS44MjMwMTM0LDEzLjk0MDMwNzYgQzIzLjUwNTQwNzYsMTkuMDYzOTk2OSAyNS45NDEwNTUsMjIuOTQ4MjE2MSAyNy4wNTA0NTk5LDIyLjM0NDk1MjYgWiIgaWQ9Ik92YWwiIHN0cm9rZT0iI0ZGRDEwNSIgZmlsbD0iI0UyQkIwRSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMuODc0MzE3LCAxMi45MDY4MDEpIHJvdGF0ZSgtMTMuMDAwMDAwKSB0cmFuc2xhdGUoLTIzLjg3NDMxNywgLTEyLjkwNjgwMSkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGQ9Ik0yMC4zMjk1MDUzLDIwLjAzNjAxODIgQzIzLjkwNDAzNDksMTUuNTM0NTQwOCAyNS4wNzI3MzkyLDExLjIwNDcyMDYgMjMuODM1NjE4Myw3LjA0NjU1NzY2IiBpZD0iUGF0aC00IiBzdHJva2U9IiMwMTMzRkQiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4zMjExMTgsIDEzLjU0MTI4OCkgcm90YXRlKC02LjAwMDAwMCkgdHJhbnNsYXRlKC0yMi4zMjExMTgsIC0xMy41NDEyODgpICI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNy40NzE2Nzk3LDI4LjQ2MzM3ODkgQzMyLjM1Njc3MDgsMjguMjI4NzExOCAzNS44NjYyMTA5LDI5LjgwMzc2MSAzOCwzMy4xODg1MjY2IiBpZD0iUGF0aC00LUNvcHkiIHN0cm9rZT0iI0QwMDIxQiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBzdHJva2U9IiMxQkMzN0IiIGZpbGw9IiMxQkMzN0IiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjUwMDAwMCwgMTAuNTAwMDAwKSByb3RhdGUoNC4wMDAwMDApIHRyYW5zbGF0ZSgtMTUuNTAwMDAwLCAtMTAuNTAwMDAwKSAiIGN4PSIxNS41IiBjeT0iMTAuNSIgcj0iMS41Ij48L2NpcmNsZT4KICAgICAgICA8cGF0aCBkPSJNMzIuMzk1MzY5Niw3Ljk5NjI4NDMzIEMzMy4yMjE3NDQ2LDguMDU0MDcwMSAzMy45Mzg0OTg2LDcuNDMxMDA1NDEgMzMuOTk2Mjg0Myw2LjYwNDYzMDM5IEMzNC4wNTQwNzAxLDUuNzc4MjU1MzggMzMuNDMxMDA1NCw1LjA2MTUwMTQ0IDMyLjYwNDYzMDQsNS4wMDM3MTU2NyBDMzEuNzc4MjU1NCw0Ljk0NTkyOTkgMzEuMDYxNTAxNCw1LjU2ODk5NDU5IDMxLjAwMzcxNTcsNi4zOTUzNjk2MSBDMzAuOTQ1OTI5OSw3LjIyMTc0NDYyIDMxLjU2ODk5NDYsNy45Mzg0OTg1NiAzMi4zOTUzNjk2LDcuOTk2Mjg0MzMgWiIgaWQ9Ik92YWwtQ29weSIgc3Ryb2tlPSIjRDAwMjFCIiBmaWxsPSIjRDAwMjFCIj48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTMxLjM5NTM2OTYsMzcuOTk2Mjg0MyBDMzIuMjIxNzQ0NiwzOC4wNTQwNzAxIDMyLjkzODQ5ODYsMzcuNDMxMDA1NCAzMi45OTYyODQzLDM2LjYwNDYzMDQgQzMzLjA1NDA3MDEsMzUuNzc4MjU1NCAzMi40MzEwMDU0LDM1LjA2MTUwMTQgMzEuNjA0NjMwNCwzNS4wMDM3MTU3IEMzMC43NzgyNTU0LDM0Ljk0NTkyOTkgMzAuMDYxNTAxNCwzNS41Njg5OTQ2IDMwLjAwMzcxNTcsMzYuMzk1MzY5NiBDMjkuOTQ1OTI5OSwzNy4yMjE3NDQ2IDMwLjU2ODk5NDYsMzcuOTM4NDk4NiAzMS4zOTUzNjk2LDM3Ljk5NjI4NDMgWiIgaWQ9Ik92YWwtQ29weS0yIiBzdHJva2U9IiMwMTMzRkQiIGZpbGw9IiMwMTMzRkQiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMzUsMjMuMzIwMTc3OCBDMzcuNTg4NTgyMiwyMi43Mjk0OTc2IDM5LjU4ODU4MjIsMjIuOTU2MTA0OSA0MSwyNCIgaWQ9IlBhdGgtOSIgc3Ryb2tlPSIjRkZEMTA1IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzguMDAwMDAwLCAyMy41MDAwMDApIHJvdGF0ZSgyLjAwMDAwMCkgdHJhbnNsYXRlKC0zOC4wMDAwMDAsIC0yMy41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNi4wMzk1NTA4LDIyLjgxODM1OTQgQzMyLjE2NTQxMTgsMTQuNTgxODAxMyAzNy43Nzg2OTMsMTAuOTEzMTgxNSA0Mi44NzkzOTQ1LDExLjgxMjUiIGlkPSJQYXRoLTEwIiBzdHJva2U9IiMxQkMzN0IiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==',
    heart:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bG92ZS1sZzwvdGl0bGU+CiAgICA8ZyBpZD0ibG92ZS1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkhlYXJ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNi4wMDAwMDApIiBmaWxsPSIjRDAwMjFCIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMTIuMDMzMzYxNSw4LjAxMzUxMzUxIEMyMi4yMjc0MTY5LDIyLjkyMjE4MDUgMzEuMTAxNjY3NiwyOC40MTY1MjIzIDM5LjAzOTA2ODIsMjYuNjc2MTk5MSBDNDcuMjY1ODg1MSwyNC44NzI0MTk1IDQ5LjkyMzUzNzEsMTUuMTgxMzIxMSAzNi45MDAwODEsOC4wMTM1MTM1MSBMMTIuMDMzMzYxNSw4LjAxMzUxMzUxIFoiIGlkPSJoZWFydC1jb3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOC45ODY0ODYsIDE3LjUwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMjguOTg2NDg2LCAtMTcuNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTS02LjkzOTYxMTQ5LDguMDEzNTEzNTEgQzMuMjU0NDQzOTEsMjIuOTIyMTgwNSAxMi4xMjg2OTQ2LDI4LjQxNjUyMjMgMjAuMDY2MDk1MywyNi42NzYxOTkxIEMyOC4yOTI5MTIxLDI0Ljg3MjQxOTUgMzAuOTUwNTY0MSwxNS4xODEzMjExIDE3LjkyNzEwOCw4LjAxMzUxMzUxIEwtNi45Mzk2MTE0OSw4LjAxMzUxMzUxIFoiIGlkPSJoZWFydC1jb3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLjAxMzUxNCwgMTcuNTAwMDAwKSBzY2FsZSgtMSwgMSkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTAuMDEzNTE0LCAtMTcuNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwiIGZpbGw9IiNEMDAyMUIiIGN4PSIyMy41IiBjeT0iMjgiIHJ4PSI0LjUiIHJ5PSIxMiI+PC9lbGxpcHNlPgogICAgPC9nPgo8L3N2Zz4=',
    plusone:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGx1cy1sZzwvdGl0bGU+CiAgICA8ZyBpZD0icGx1cy1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjAwMDAwMCwgOC4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjM1MDgyNywyNi4wNCBMMTEuMjM1MDgyNywyMC4yMjU2NDU5IEwxNi40Nzc1LDIwLjIyNTY0NTkgTDE2LjQ3NzUsMTQuNDk0MzU0MSBMMTEuMjM1MDgyNywxNC40OTQzNTQxIEwxMS4yMzUwODI3LDguNjggTDUuODc2MTY3MjgsOC42OCBMNS44NzYxNjcyOCwxNC40OTQzNTQxIEwwLjYzMzc1LDE0LjQ5NDM1NDEgTDAuNjMzNzUsMjAuMjI1NjQ1OSBMNS44NzYxNjcyOCwyMC4yMjU2NDU5IEw1Ljg3NjE2NzI4LDI2LjA0IEwxMS4yMzUwODI3LDI2LjA0IFogTTM3LjE5NjI1LDMxIEwzNy4xOTYyNSwyNS4xOTY1MTE2IEwzMi4yODA2MjUsMjUuMTk2NTExNiBMMzIuMjgwNjI1LDIuNDggTDI2LjQzMDYyNSwyLjQ4IEMyNi40MzA2MjUsNS4zODE3NDQxOSAyNC4yNzc1LDYuNzkxMTYyNzkgMjEuMzUyNSw2Ljc5MTE2Mjc5IEwyMS4zNTI1LDExLjU1ODMxNCBMMjYuNDMwNjI1LDExLjU1ODMxNCBMMjYuNDMwNjI1LDI1LjE5NjUxMTYgTDIxLjM1MjUsMjUuMTk2NTExNiBMMjEuMzUyNSwzMSBMMzcuMTk2MjUsMzEgWiIgaWQ9IisxIiBmaWxsPSIjRkZEMTA1Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy42NzI1ODI3LDIzLjU2IEwxMy42NzI1ODI3LDE3Ljc0NTY0NTkgTDE4LjkxNSwxNy43NDU2NDU5IEwxOC45MTUsMTIuMDE0MzU0MSBMMTMuNjcyNTgyNywxMi4wMTQzNTQxIEwxMy42NzI1ODI3LDYuMiBMOC4zMTM2NjcyOCw2LjIgTDguMzEzNjY3MjgsMTIuMDE0MzU0MSBMMy4wNzEyNSwxMi4wMTQzNTQxIEwzLjA3MTI1LDE3Ljc0NTY0NTkgTDguMzEzNjY3MjgsMTcuNzQ1NjQ1OSBMOC4zMTM2NjcyOCwyMy41NiBMMTMuNjcyNTgyNywyMy41NiBaIE0zOS42MzM3NSwyOC41MiBMMzkuNjMzNzUsMjIuNzE2NTExNiBMMzQuNzE4MTI1LDIyLjcxNjUxMTYgTDM0LjcxODEyNSwwIEwyOC44NjgxMjUsMCBDMjguODY4MTI1LDIuOTAxNzQ0MTkgMjYuNzE1LDQuMzExMTYyNzkgMjMuNzksNC4zMTExNjI3OSBMMjMuNzksOS4wNzgzMTM5NSBMMjguODY4MTI1LDkuMDc4MzEzOTUgTDI4Ljg2ODEyNSwyMi43MTY1MTE2IEwyMy43OSwyMi43MTY1MTE2IEwyMy43OSwyOC41MiBMMzkuNjMzNzUsMjguNTIgWiIgaWQ9IisxIiBmaWxsPSIjMUJDMzdCIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
    question:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cXVlc3Rpb24tbGc8L3RpdGxlPgogICAgPGcgaWQ9InF1ZXN0aW9uLWxnIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgNi4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMTIuNTU1NTM1NywyNi4yNSBMMTIuNTU1NTM1NywyNS4wMzUgQzEyLjU1NTUzNTcsMjMuMTc3NCAxMi42MDI4NSwyMy4wMjAxNTIgMTQuNzg2ODc3NCwyMS4wOTk1MTQ2IEwxNS4wNzExNjA3LDIwLjg1IEMxNy45NDYxNjA3LDE4LjMzIDE5LjQzNSwxNi45OCAxOS40MzUsMTIuNzk1IEMxOS40MzUsOC40NzUgMTcuMDczMzkyOSwzLjc1IDkuMzcyNSwzLjc1IEMzLjAwNjQyODU3LDMuNzUgLTAuNjksNy41MyAtMC42OSwxMi44ODUgTC0wLjY5LDE0LjY4NSBMNi40OTc1LDE0LjY4NSBMNi40OTc1LDEyLjg4NSBDNi40OTc1LDExLjU4IDcuMjY3NTg5MjksOS45MTUgOS4zNzI1LDkuOTE1IEMxMS41Mjg3NSw5LjkxNSAxMi4yNDc1LDExLjEzIDEyLjI0NzUsMTIuNzk1IEMxMi4yNDc1LDE0LjY0IDExLjExODAzNTcsMTUuNTg1IDkuNDc1MTc4NTcsMTYuOTM1IEM1LjY3NjA3MTQzLDIwLjA4NSA1LjM2ODAzNTcxLDIwLjM1NSA1LjM2ODAzNTcxLDIzLjE5IEw1LjM2ODAzNTcxLDI2LjI1IEwxMi41NTU1MzU3LDI2LjI1IFogTTEzLjY4NSwzNSBMMTMuNjg1LDI3LjUgTDUuMDYsMjcuNSBMNS4wNiwzNSBMMTMuNjg1LDM1IFoiIGlkPSI/IiBmaWxsPSIjRkZEMTA1Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNS40MzA1MzU3LDIzLjc1IEwxNS40MzA1MzU3LDIyLjQ2NzUgQzE1LjQzMDUzNTcsMjAuNTA2NyAxNS40Nzc4NSwyMC4zNDA3MTYgMTcuNjYxODc3NCwxOC4zMTMzNzY1IEwxNy45NDYxNjA3LDE4LjA1IEMyMC44MjExNjA3LDE1LjM5IDIyLjMxLDEzLjk2NSAyMi4zMSw5LjU0NzUgQzIyLjMxLDQuOTg3NSAxOS45NDgzOTI5LDAgMTIuMjQ3NSwwIEM1Ljg4MTQyODU3LDAgMi4xODUsMy45OSAyLjE4NSw5LjY0MjUgTDIuMTg1LDExLjU0MjUgTDkuMzcyNSwxMS41NDI1IEw5LjM3MjUsOS42NDI1IEM5LjM3MjUsOC4yNjUgMTAuMTQyNTg5Myw2LjUwNzUgMTIuMjQ3NSw2LjUwNzUgQzE0LjQwMzc1LDYuNTA3NSAxNS4xMjI1LDcuNzkgMTUuMTIyNSw5LjU0NzUgQzE1LjEyMjUsMTEuNDk1IDEzLjk5MzAzNTcsMTIuNDkyNSAxMi4zNTAxNzg2LDEzLjkxNzUgQzguNTUxMDcxNDMsMTcuMjQyNSA4LjI0MzAzNTcxLDE3LjUyNzUgOC4yNDMwMzU3MSwyMC41MiBMOC4yNDMwMzU3MSwyMy43NSBMMTUuNDMwNTM1NywyMy43NSBaIE0xNi41NiwzMi41IEwxNi41NiwyNSBMNy45MzUsMjUgTDcuOTM1LDMyLjUgTDE2LjU2LDMyLjUgWiIgaWQ9Ij8iIGZpbGw9IiMwMTMzRkQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
    clap:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+Y2xhcC1sZzwvdGl0bGU+CiAgICA8ZyBpZD0iY2xhcC1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTMzLjc1MzEzNTEsMjEuMDY1MTk3MSBMMzMuNjUxMDI2MSwyMS4wMjg2Njg0IEMzMi42MDU5NDY4LDIwLjY1NDg5MTggMzEuNDU1NjQzMSwyMS4xOTkwODM4IDMxLjA4MTg2NjQsMjIuMjQ0MjQwOSBMMjkuNDE2MDMyOSwyNy42MzQwNTUzIEwyOS41NzE4MDU2LDI0LjQ0NTIzMTcgTDI5LjU3MTgwNTYsMjQuMDU1Nzk5OSBMMjkuNTcxODA1NiwxMC4zMTk4Mzg0IEMyOS41NzE4MDU2LDkuMzAyODc2MTYgMjguNzQ3NDU2Myw4LjQ3ODUyNjg3IDI3LjczMDU3MTksOC40Nzg1MjY4NyBMMjcuMjg1MDYxOSw4LjQ3ODUyNjg3IEMyNi4yNjgxNzc1LDguNDc4NTI2ODcgMjUuNDQzODI4Miw5LjMwMjg3NjE2IDI1LjQ0MzgyODIsMTAuMzE5ODM4NCBMMjUuNDQzODI4MiwyMy43ODMxOTc2IEMyNS40NDM4MjgyLDIzLjkzMzc1MiAyNS4zMjE3ODAzLDI0LjA1NTc5OTkgMjUuMTcxMjI2LDI0LjA1NTc5OTkgQzI1LjAyMDY3MTYsMjQuMDU1Nzk5OSAyNC44OTg2MjM3LDIzLjkzMzc1MiAyNC44OTg2MjM3LDIzLjc4MzE5NzYgTDI0Ljg5ODYyMzcsOC40MDIwNDI0NiBDMjQuODk4NjIzNyw3LjM2ODg3OTgzIDI0LjA2MTExMTYsNi41MzEzNjc3NSAyMy4wMjc5NDksNi41MzEzNjc3NSBMMjIuNjQxMzIxLDYuNTMxMzY3NzUgQzIxLjYwODE1ODQsNi41MzEzNjc3NSAyMC43NzA2NDYzLDcuMzY4ODc5ODMgMjAuNzcwNjQ2Myw4LjQwMjA0MjQ2IEwyMC43NzA2NDYzLDIzLjc4MzE5NzYgQzIwLjc3MDY0NjMsMjMuOTMzNzUyIDIwLjY0ODU5ODQsMjQuMDU1Nzk5OSAyMC40OTgwNDQsMjQuMDU1Nzk5OSBDMjAuMzQ3NDg5NywyNC4wNTU3OTk5IDIwLjIyNTQ0MTgsMjMuOTMzNzUyIDIwLjIyNTQ0MTgsMjMuNzgzMTk3NiBMMjAuMjI1NDQxOCwxMS4yMDMxNDc3IEMyMC4yMjU0NDE4LDEwLjE2OTk4NTEgMTkuMzg3OTI5Nyw5LjMzMjQ3Mjk4IDE4LjM1NDc2NzEsOS4zMzI0NzI5OCBMMTcuOTY4MTM5MSw5LjMzMjQ3Mjk4IEMxNi45MzQ5NzY1LDkuMzMyNDcyOTggMTYuMDk3NDY0NCwxMC4xNjk5ODUxIDE2LjA5NzQ2NDQsMTEuMjAzMTQ3NyBMMTYuMDk3NDY0NCwyMy43ODMxOTc2IEMxNi4wOTc0NjQ0LDIzLjkzMzc1MiAxNS45NzU0MTY1LDI0LjA1NTc5OTkgMTUuODI0ODYyMSwyNC4wNTU3OTk5IEMxNS42NzQzMDc4LDI0LjA1NTc5OTkgMTUuNTUyMjU5OSwyMy45MzM3NTIgMTUuNTUyMjU5OSwyMy43ODMxOTc2IEwxNS41NTIyNTk5LDE1LjA4ODc0MjcgQzE1LjU1MjI1OTksMTQuMTA1MDM3OSAxNC43NTQ3ODE0LDEzLjMwNzQ4MTUgMTMuNzcwOTk4NywxMy4zMDc0ODE1IEwxMy4yMDU1NDM3LDEzLjMwNzQ4MTUgQzEyLjIyMTc2MSwxMy4zMDc0ODE1IDExLjQyNDI4MjUsMTQuMTA1MDM3OSAxMS40MjQyODI1LDE1LjA4ODc0MjcgTDExLjQyNDI4MjUsMjQuMDU1Nzk5OSBMMTEuNDI0MjgyNSwyNC40NDUyMzE3IEwxMS40MjQyODI1LDMzLjYzMDY4MjMgQzExLjQyNDI4MjUsMzcuODA2MDE0NiAxNC44MDkwNjgyLDQxLjE5MDgwMDIgMTguOTg0NDAwNCw0MS4xOTA4MDAyIEwyMi4wMTE2ODc3LDQxLjE5MDgwMDIgQzIzLjEwNTk5MTEsNDEuMTkwODAwMiAyNS42MzQxMDQ2LDQxLjAyNTA1OCAyNi41NzMxODA1LDQwLjYwNjY1MjUgQzI3LjIwMTU2NzcsNDAuNDIyOTk2NCAyNy44MTA5NTA2LDQwLjA1MzgxNTEgMjguMzYxMTM5OSwzOS42MTMyMTE5IEMyOS42OTgxMzczLDM4LjU0MjE5NjUgMzAuNjU2NDUxMSwzNy4wNzAzIDMxLjE0NTczMzIsMzUuNDI4NTMzMyBMMzUuMTI0NDAyNCwyMy42MzQ0MzQ3IEMzNS40OTgyNTcsMjIuNTg5MzU1NCAzNC43OTgyOTIyLDIxLjQzOTA1MTcgMzMuNzUzMTM1MSwyMS4wNjUxOTcxIiBpZD0iRmlsbC0xIiBmaWxsPSIjRTJCQjBFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMy4zMjUyNjcsIDIzLjg2MTA4NCkgcm90YXRlKC01Ni4wMDAwMDApIHRyYW5zbGF0ZSgtMjMuMzI1MjY3LCAtMjMuODYxMDg0KSAiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMzYuODE5Nzg1NSwyMC4zNDMwMjkyIEwzNi43MTc2NzY1LDIwLjMwNjUwMDUgQzM1LjY3MjU5NzIsMTkuOTMyNzIzOCAzNC41MjIyOTM1LDIwLjQ3NjkxNTggMzQuMTQ4NTE2OCwyMS41MjIwNzMgTDMyLjQ4MjY4MzIsMjYuOTExODg3MyBMMzIuNjM4NDU2LDIzLjcyMzA2MzggTDMyLjYzODQ1NiwyMy4zMzM2MzE5IEwzMi42Mzg0NTYsOS41OTc2NzA0NiBDMzIuNjM4NDU2LDguNTgwNzA4MTkgMzEuODE0MTA2Nyw3Ljc1NjM1ODkxIDMwLjc5NzIyMjMsNy43NTYzNTg5MSBMMzAuMzUxNzEyMyw3Ljc1NjM1ODkxIEMyOS4zMzQ4Mjc5LDcuNzU2MzU4OTEgMjguNTEwNDc4Niw4LjU4MDcwODE5IDI4LjUxMDQ3ODYsOS41OTc2NzA0NiBMMjguNTEwNDc4NiwyMy4wNjEwMjk3IEMyOC41MTA0Nzg2LDIzLjIxMTU4NCAyOC4zODg0MzA3LDIzLjMzMzYzMTkgMjguMjM3ODc2MywyMy4zMzM2MzE5IEMyOC4wODczMjIsMjMuMzMzNjMxOSAyNy45NjUyNzQxLDIzLjIxMTU4NCAyNy45NjUyNzQxLDIzLjA2MTAyOTcgTDI3Ljk2NTI3NDEsNy42Nzk4NzQ1IEMyNy45NjUyNzQxLDYuNjQ2NzExODYgMjcuMTI3NzYyLDUuODA5MTk5NzggMjYuMDk0NTk5Myw1LjgwOTE5OTc4IEwyNS43MDc5NzE0LDUuODA5MTk5NzggQzI0LjY3NDgwODgsNS44MDkxOTk3OCAyMy44MzcyOTY3LDYuNjQ2NzExODYgMjMuODM3Mjk2Nyw3LjY3OTg3NDUgTDIzLjgzNzI5NjcsMjMuMDYxMDI5NyBDMjMuODM3Mjk2NywyMy4yMTE1ODQgMjMuNzE1MjQ4OCwyMy4zMzM2MzE5IDIzLjU2NDY5NDQsMjMuMzMzNjMxOSBDMjMuNDE0MTQwMSwyMy4zMzM2MzE5IDIzLjI5MjA5MjIsMjMuMjExNTg0IDIzLjI5MjA5MjIsMjMuMDYxMDI5NyBMMjMuMjkyMDkyMiwxMC40ODA5Nzk3IEMyMy4yOTIwOTIyLDkuNDQ3ODE3MSAyMi40NTQ1ODAxLDguNjEwMzA1MDEgMjEuNDIxNDE3NCw4LjYxMDMwNTAxIEwyMS4wMzQ3ODk1LDguNjEwMzA1MDEgQzIwLjAwMTYyNjksOC42MTAzMDUwMSAxOS4xNjQxMTQ4LDkuNDQ3ODE3MSAxOS4xNjQxMTQ4LDEwLjQ4MDk3OTcgTDE5LjE2NDExNDgsMjMuMDYxMDI5NyBDMTkuMTY0MTE0OCwyMy4yMTE1ODQgMTkuMDQyMDY2OSwyMy4zMzM2MzE5IDE4Ljg5MTUxMjUsMjMuMzMzNjMxOSBDMTguNzQwOTU4MiwyMy4zMzM2MzE5IDE4LjYxODkxMDMsMjMuMjExNTg0IDE4LjYxODkxMDMsMjMuMDYxMDI5NyBMMTguNjE4OTEwMywxNC4zNjY1NzQ3IEMxOC42MTg5MTAzLDEzLjM4Mjg2OTkgMTcuODIxNDMxOCwxMi41ODUzMTM1IDE2LjgzNzY0OTEsMTIuNTg1MzEzNSBMMTYuMjcyMTk0MSwxMi41ODUzMTM1IEMxNS4yODg0MTE0LDEyLjU4NTMxMzUgMTQuNDkwOTMyOSwxMy4zODI4Njk5IDE0LjQ5MDkzMjksMTQuMzY2NTc0NyBMMTQuNDkwOTMyOSwyMy4zMzM2MzE5IEwxNC40OTA5MzI5LDIzLjcyMzA2MzggTDE0LjQ5MDkzMjksMzIuOTA4NTE0MyBDMTQuNDkwOTMyOSwzNy4wODM4NDY2IDE3Ljg3NTcxODYsNDAuNDY4NjMyMyAyMi4wNTEwNTA4LDQwLjQ2ODYzMjMgTDI1LjA3ODMzODEsNDAuNDY4NjMyMyBDMjYuMTcyNjQxNSw0MC40Njg2MzIzIDI4LjcwMDc1NSw0MC4zMDI4OTAxIDI5LjYzOTgzMDksMzkuODg0NDg0NSBDMzAuMjY4MjE4MSwzOS43MDA4Mjg1IDMwLjg3NzYwMSwzOS4zMzE2NDcxIDMxLjQyNzc5MDMsMzguODkxMDQzOSBDMzIuNzY0Nzg3NywzNy44MjAwMjg1IDMzLjcyMzEwMTUsMzYuMzQ4MTMyIDM0LjIxMjM4MzYsMzQuNzA2MzY1MyBMMzguMTkxMDUyOCwyMi45MTIyNjY3IEMzOC41NjQ5MDc0LDIxLjg2NzE4NzQgMzcuODY0OTQyNiwyMC43MTY4ODM3IDM2LjgxOTc4NTUsMjAuMzQzMDI5MiIgaWQ9IkZpbGwtMSIgZmlsbD0iI0ZGRDEwNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuMzkxOTE4LCAyMy4xMzg5MTYpIHJvdGF0ZSgtNTYuMDAwMDAwKSB0cmFuc2xhdGUoLTI2LjM5MTkxOCwgLTIzLjEzODkxNikgIj48L3BhdGg+CiAgICAgICAgPGxpbmUgeDE9IjI0LjIyNTA1ODYiIHkxPSI5LjUyNzA5OTYxIiB4Mj0iMjEuNzg3NTU4NiIgeTI9IjUuNjM3ODE1NjQiIGlkPSJQYXRoLTgiIHN0cm9rZT0iIzFCQzM3QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMzUuNTYwMjYzNyIgeTE9IjEwLjMwNjE1MjMiIHgyPSIzMy4xMjI3NjM3IiB5Mj0iNi40MTY4NjgzNyIgaWQ9IlBhdGgtOCIgc3Ryb2tlPSIjMUJDMzdCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQuMzQxNTE0LCA4LjM2MTUxMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzQuMzQxNTE0LCAtOC4zNjE1MTApICI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxNy4yOTEzNTcyIiB5MT0iMzguODg0MTY5MiIgeDI9IjEzLjYwNjQ1NzMiIHkyPSI0NS4zNjQ4ODgzIiBpZD0iUGF0aC0xMSIgc3Ryb2tlPSIjMUJDMzdCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMS4yMjYxMDU0IiB5MT0iNDAuNzA1NDg2OCIgeDI9IjIxLjcxMTk2NiIgeTI9IjQ1LjI2OTY4MTgiIGlkPSJQYXRoLTgiIHN0cm9rZT0iIzFCQzM3QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMTMuNTcwNDE1MyIgeTE9IjM2LjEwNDc4MTciIHgyPSI5LjY3NDY1NDk2IiB5Mj0iMzguNTMxOTE3MyIgaWQ9IlBhdGgtOCIgc3Ryb2tlPSIjMUJDMzdCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyOC45NTI1MTI1IiB5MT0iOS4yMzc2NjkxNSIgeDI9IjI5LjQyMzUxODQiIHkyPSIxLjc5NzQ4MzYiIGlkPSJQYXRoLTExIiBzdHJva2U9IiMxQkMzN0IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L2xpbmU+CiAgICA8L2c+Cjwvc3ZnPg==',
    smile:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+c21pbGUtbGc8L3RpdGxlPgogICAgPGcgaWQ9InNtaWxlLWxnIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjRkZEMTA1IiBjeD0iMjMuNSIgY3k9IjIzLjUiIHI9IjIyLjUiPjwvY2lyY2xlPgogICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDE3LjAwMDAwMCkiIHN0cm9rZT0iIzAxMzNGRCI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LjA4OTQ1MzEsMy4wNTg3ODkwNiBDMTkuNTc3MzQ1NywxLjM4NzAzNDI4IDIxLjIyNzU0MSwwLjU1MjcxODUyNyAyMy4wNDAwMzkxLDAuNTU1ODQxODA0IEMyNC44NDY3NjExLDAuNTU4OTc4NTE4IDI2LjQ3NTAxNjMsMS4zOTY0ODQzOCAyNy45MjQ4MDQ3LDMuMDY4MzU5MzgiIGlkPSJyaWdodC1leWUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMuMDU4Nzg5MDYgQzEuNDg3ODkyNTksMS4zODcwMzQyOCAzLjEzODA4NzksMC41NTI3MTg1MjcgNC45NTA1ODU5NCwwLjU1NTg0MTgwNCBDNi43NTczMDc5NCwwLjU1ODk3ODUxOCA4LjM4NTU2MzE1LDEuMzk2NDg0MzggOS44MzUzNTE1NiwzLjA2ODM1OTM4IiBpZD0ibGVmdC1leWUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8cGF0aCBkPSJNMTMuOTQ2MzEzNiwxOSBDOS4wNTU3MDU2LDE5IDUuNDA2OTM0NCwxNi42NjY2NjY3IDMsMTIgTDMsMTIgTDI0LDEyIEwyNCwxMiBDMjIuMTg4MTUwNCwxNi42NjY2NjY3IDE4LjgzNjkyMTYsMTkgMTMuOTQ2MzEzNiwxOSBaIiBpZD0iUGF0aC0yIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiMwMTMzRkQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
};

const calculateAlpha = (yCurrent, yStart, yEnd) => {
    const yMid = (yStart - yEnd) / 2;
    const alpha = 1 - Math.abs(yMid - (yCurrent - 20)) / yMid;
    return alpha < 0 ? 0 : alpha;
};

export default class Animation {
    canvasEl;
    ctx;
    render;
    images = {};
    animate;

    constructor(elem) {
        this.canvasEl = elem;
        this.setCanvasSize();
        this.ctx = this.canvasEl.getContext('2d');
        this.render = anime({
            duration: Infinity,
            update: () => {
                this.ctx.clearRect(
                    0,
                    0,
                    this.canvasEl.width,
                    this.canvasEl.height
                );
            }
        });
    }

    loadImage(name) {
        if (this.images[name]) {
            return this.images[name];
        }

        const image = new Image();
        image.src = emojiUrlLookup[name];
        this.images[name] = image;
        return image;
    }

    setCanvasSize() {
        this.canvasRect = this.canvasEl.getBoundingClientRect();
        this.canvasEl.width = this.canvasRect.width;
        this.canvasEl.height = this.canvasRect.height;
        this.canvasEl.getContext('2d').scale(1, 1);
    }

    setParticuleDirection(p) {
        const angle = 1.55;
        const radius = -this.canvasRect.height;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        };
    }

    createParticule(img) {
        const p = {};
        const x = anime.random(30, 60);
        const yBase = this.canvasRect.height - 78;
        const yWiggle = 30;
        const y = anime.random(yBase - yWiggle / 2, yBase + yWiggle / 2);
        p.startPos = { x, y };
        p.x = x;
        p.y = y;
        p.radius = anime.random(24, 48);
        p.endPos = this.setParticuleDirection(p);
        p.draw = () => {
            this.ctx.globalAlpha = calculateAlpha(
                +p.y,
                p.startPos.y,
                p.endPos.y
            );
            this.ctx.drawImage(img, p.x, p.y, p.radius, p.radius);
        };
        return p;
    }

    renderParticule(anim) {
        anim.animatables.forEach((i) => i.target.draw());
    }

    animateParticules(img) {
        const particules = [this.createParticule(img)];

        anime.timeline().add({
            targets: particules,
            x: (p) => p.endPos.x,
            y: (p) => p.endPos.y,
            radius: anime.random(10, 80),
            duration: anime.random(12000, 15000),
            easing: 'easeOutExpo',
            update: this.renderParticule
        });
    }

    fireAnimation(name) {
        const img = this.loadImage(name);
        if (this.animate) {
            this.animate(img);
        } else {
            this.animate = debounce(10, (image) => {
                this.render.play();
                this.animateParticules(image);
            });
            this.animate(img);
        }
    }
}
