# Triage Labels

This repo does not use issue-tracker labels. Triage state is recorded in markdown issue files under `.scratch/`.

| Canonical role in mattpocock/skills | Markdown `Status` value | Meaning                                  |
| ------------------------------------ | ----------------------- | ---------------------------------------- |
| `needs-triage`                       | `needs-triage`          | Maintainer needs to evaluate this issue  |
| `needs-info`                         | `needs-info`            | Waiting on reporter for more information |
| `ready-for-agent`                    | `ready-for-agent`       | Fully specified, ready for an AFK agent  |
| `ready-for-human`                    | `ready-for-human`       | Requires human implementation            |
| `wontfix`                            | `wontfix`               | Will not be actioned                     |

When a skill mentions applying or removing a label, update the markdown issue's `Status` field to the mapped value above.

If your statuses change later, update the `Markdown Status value` column to keep skill behavior aligned.
