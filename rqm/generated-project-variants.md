# Feature: Valid Generated Project Variants <!-- rq-a953fcc4 -->

Every supported answer combination renders a coherent project. Optional documentation describes
only artifacts that exist in the rendered or pre-existing project, and generated licensing material
contains the notices and complete license texts needed to communicate the selected terms. Generated
contributor guidance distinguishes commands supplied by a rendered skeleton from commands that an
existing project must define for itself.

## Agent Selection <!-- rq-46f6180d -->

- A generated project installs any subset of the supported command-line agents -- Claude, Codex,
  and OpenCode. The choice is presented as a single multiple-choice question whose answer is the set
  of agents to install, so a project selects the agents together rather than answering a separate
  question for each one.
- The selection may be every agent, a proper subset, or none. The default selection is every
  supported agent, so a project that expresses no preference installs all of them.
- Every selection renders a coherent project. Generated documentation that tells a reader which
  agents the container provides, and how to start them, names exactly the selected agents and does
  not instruct a reader to run an agent the project did not install. A project that selects no agent
  describes a container without an agent rather than claiming an absent one.

## Python Documentation <!-- rq-51db1fdd -->

- A Python documentation skeleton is self-contained and buildable when it is rendered into an empty
  destination, whether or not Riprap also creates the Python package skeleton.
- Documentation generated with the Python package skeleton may include package installation and API
  references for the generated import package.
- Documentation generated without the Python package skeleton does not invent modules, install a
  nonexistent local package, or otherwise assume files that Riprap did not render. A project adding
  Riprap to an existing Python package may replace or extend the generic documentation with
  package-specific API material as user-owned content.
- Documentation dependencies and build instructions agree with the selected dependency source and
  with the files present in that project variant.

## License Distribution <!-- rq-5cab8102 -->

- Selecting MIT or BSD-3-Clause produces the complete selected license text and a project copyright
  notice containing the configured year and author.
- Selecting LGPL-3.0-or-later produces verbatim copies of both the GNU Lesser General Public License
  version 3 and the GNU General Public License version 3 on which it depends. The generated project
  also contains a separate project copyright notice and a clear statement that the project is
  licensed under LGPL-3.0-or-later.
- License metadata in generated language manifests uses the selected SPDX identifier and includes
  every generated license and notice file in distributable source and package artifacts.
- Selecting Not Open Source produces no open-source license text and does not claim an open-source
  SPDX license in a generated language manifest.
- License texts remain unmodified upstream legal texts. Project-specific names, authors, years, and
  explanatory notices live outside those verbatim texts.

## Contributor Guidance <!-- rq-1d50425d -->

- Contributor guidance is grammatical and refers to the generated project by name.
- When Riprap creates a Rust or Python skeleton, contributor guidance names the corresponding
  rendered test command.
- When a project omits its language skeleton, contributor guidance does not claim that Riprap
  supplied a test command or prescribe a command whose supporting files were not rendered. It
  directs contributors to the project's own test instructions instead.

## Gherkin Scenarios <!-- rq-7de9b8bd -->

```gherkin
Feature: Render coherent project variants

  @rq-5724d2c4
  Scenario: Documentation without a generated Python package is self-contained
    Given an empty destination
    And a Python project requests documentation without a Python package skeleton
    When the project is rendered
    Then the documentation does not reference a nonexistent project module
    And its dependency files do not install a nonexistent local package
    And the documented documentation-build command succeeds using only rendered files

  @rq-c39f2457
  Scenario: Documentation accompanies a generated Python package
    Given a Python project requests both documentation and a Python package skeleton
    When the project is rendered
    Then the documentation names the generated import package
    And its dependency files install the generated package
    And the documented documentation-build command succeeds

  @rq-197626f6
  Scenario: LGPL distribution includes its complete license basis
    Given a project selects "LGPL-3.0-or-later"
    When the project is rendered
    Then it contains verbatim LGPL version 3 and GPL version 3 license texts
    And it contains a separate project copyright and licensing notice
    And generated language metadata identifies the license as "LGPL-3.0-or-later"
    And every license and notice file is included in distributable package metadata

  @rq-3d28cd5f
  Scenario: Permissive licenses carry the project notice
    Given a project selects "MIT" or "BSD-3-Clause"
    When the project is rendered
    Then it contains the complete selected license text
    And the project copyright notice contains the configured year and author

  @rq-3eec4386
  Scenario: A closed-source project makes no open-source license claim
    Given a project selects "Not Open Source"
    When the project is rendered
    Then no open-source license text is generated
    And generated language metadata makes no open-source SPDX license claim

  @rq-69a673e1
  Scenario: Contributor guidance matches a generated language skeleton
    Given a project requests a Rust or Python language skeleton
    When the project is rendered
    Then its contributor guidance names the test command supplied by that skeleton

  @rq-56ec2cc3
  Scenario: Contributor guidance does not invent a test command
    Given a project omits its language skeleton
    When the project is rendered
    Then its contributor guidance does not prescribe a language test command supplied by Riprap
    And it directs contributors to the project's own test instructions

  @rq-bcbeb1ed
  Scenario: Generated guidance names only the selected agents
    Given a project selects Claude and OpenCode but not Codex
    When the project is rendered
    Then its generated documentation explains how to start Claude and OpenCode
    And its generated documentation does not instruct the reader to run Codex

  @rq-9ebdd1a7
  Scenario: A project selecting every agent documents all of them
    Given a project selects all supported agents
    When the project is rendered
    Then its generated documentation explains how to start Claude, Codex, and OpenCode

  @rq-18962eb4
  Scenario: A project with no agents documents an agent-less container
    Given a project selects none of the supported agents
    When the project is rendered
    Then its generated documentation does not instruct the reader to run any agent
    And it does not claim any agent is installed in the container
```
