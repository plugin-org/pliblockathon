import 'package:flutter/material.dart';
import 'package:startup_hub/Screens/home.dart';
import '../Widgets/widgets.dart';
import '../Widgets/constants.dart';
import '../Widgets/roundButton.dart';

class createjob extends StatelessWidget {
  const createjob({super.key});
  static const String id = 'createjob';

  @override
  Widget build(BuildContext context) {
    String startupdescription = "";
    String startupname = "";
    return Scaffold(
      appBar: appBar(),
      drawer: apdrawer(),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(
              height: 30,
            ),
            TextField(
              onChanged: (value) {
                startupname = value;
              },
              decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter the startup name'),
            ),
            SizedBox(
              height: 20,
            ),
            TextField(
              style: TextStyle(fontSize: 10),
              keyboardType: TextInputType.multiline,
              maxLines: null,
              onChanged: (value) {
                startupdescription = value;
              },
              decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter the  Description.'),
            ),
            SizedBox(
              height: 20,
            ),
            RoundButton(
              color: Colors.lightBlueAccent,
              title: 'Get patent',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: ((context) => Home()),
                  ),
                );
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: bar(),
    );
  }
}
