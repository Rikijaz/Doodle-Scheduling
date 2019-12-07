# Doodle-Scheduling

[Live demo](https://rikijaz.github.io/Doodle-Scheduling/ "Doodle Scheduling")

## Testing

1. Go to the appropriate directory.

`cd doodle_scheduling`

2. Set test script permission.

`chmod +x tests.sh`

3. Run test script. The script will install necessary dependencies and run all test files. 

`bash ./tests.sh`

The test files can be located in **doodle_scheduling/src/components**.

## Contributing

All development occurs on the branch **dev**. Therefore, to contribute to this project you must create a branch that branches off of the **dev** branch.

1. Create a **name-of-your-feature** branch off of **dev** branch

`git checkout -b name-of-your-feature dev` 

2. Do your work and then commit changes 

`git commit -m 'your message'`

3. Push changes

`git push origin name-of-your-feature`

Once you've completed your feature and it is ready to be integrated, you can open a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) from Github's main page. Please note that the pull request needs to be pointed to the **dev** branch on the merge, NOT **master**. Eric will merge the **dev** branch into the **master** branch.
