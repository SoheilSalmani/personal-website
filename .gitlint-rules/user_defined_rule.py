"""User-defined rule for Gitlint."""

import re
from typing import List

from gitlint.git import GitCommit
from gitlint.options import ListOption
from gitlint.rules import CommitRule, RuleViolation

RULE_REGEX = re.compile(r"[^(]+?(\([^)]+?\))?: .+")


class ConventionalCommitWithEmoji(CommitRule):
    """This rule enforces the use of Conventional Commits and emojis.

    This rule enforces the spec at https://www.conventionalcommits.org/ and add
    an additional rule which enforces the use of an allowed emoji at the
    beginning of the title (see https://gitmoji.dev/).
    """

    name = "title-conventional-commits-with-emoji"
    id = "UC1"
    options_spec = [
        ListOption(
            "types",
            [
                "fix",
                "feat",
                "chore",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "revert",
                "ci",
                "build",
                "merge",
            ],
            "Comma separated list of allowed commit types.",
        ),
        ListOption(
            "emojis",
            [
                "🎨",
                "⚡️",
                "🔥",
                "🐛",
                "🚑️",
                "✨",
                "📝",
                "🚀",
                "💄",
                "🎉",
                "✅",
                "🔒️",
                "🔖",
                "🚨",
                "🚧",
                "💚",
                "⬇️",
                "⬆️",
                "📌",
                "👷",
                "📈",
                "♻️",
                "➕",
                "➖",
                "🔧",
                "🔨",
                "🌐",
                "✏️",
                "💩",
                "⏪️",
                "🔀",
                "📦️",
                "👽️",
                "🚚",
                "📄",
                "💥",
                "🍱",
                "♿️",
                "💡",
                "🍻",
                "💬",
                "🗃️",
                "🔊",
                "🔇",
                "👥",
                "🚸",
                "🏗️",
                "📱",
                "🤡",
                "🥚",
                "🙈",
                "📸",
                "⚗️",
                "🔍️",
                "🏷️",
                "🌱",
                "🚩",
                "🥅",
                "💫",
                "🗑️",
                "🛂",
                "🩹",
                "🧐",
                "⚰️",
                "🧪",
                "👔",
            ],
            "Comma separated list of allowed emojis.",
        ),
    ]

    def validate(self, commit: GitCommit) -> List[RuleViolation]:
        """Validate the use of Conventional Commits and emojis.

        The title should start with an allowed emoji (see https://gitmoji.dev/)
        and the rest of the title should follow the Conventional Commits
        spec.
        """
        violations = []
        for commit_emoji in self.options["emojis"].value:
            if commit.message.title.startswith(commit_emoji):
                break
        else:
            msg = (
                "Title does not start with one of the allowed emojis (see "
                "https://gitmoji.dev/)"
            )
            violations.append(
                RuleViolation(self.id, msg, commit.message.title, line_nr=0)
            )

        for commit_type in self.options["types"].value:
            if commit.message.title[2:].startswith(commit_type):
                break
        else:
            msg = "Title does not start (after the emoji) with one of {0}".format(
                ", ".join(self.options["types"].value)
            )
            violations.append(
                RuleViolation(self.id, msg, commit.message.title, line_nr=0)
            )
        if not RULE_REGEX.match(commit.message.title):
            msg = (
                "Title does not follow ConventionalCommits.org format "
                "'type(optional-scope): description'"
            )
            violations.append(
                RuleViolation(self.id, msg, commit.message.title, line_nr=0)
            )
        return violations
