import 'package:flutter/material.dart';
import '../Widgets/roundButton.dart';
import '../Widgets/widgets.dart';
import '../Widgets/constants.dart';
import 'patent.dart';

class jobs extends StatefulWidget {
  const jobs({super.key});

  @override
  State<jobs> createState() => _jobsState();
}

class _jobsState extends State<jobs> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(),
      drawer: apdrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(20),
            child: TextField(
              obscureText: false,
              onChanged: (value) {},
              decoration: kTextFieldDecoration.copyWith(hintText: 'Search'),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: Text('list of patents'),
          ),
          RoundButton(
              color: Colors.lightBlueAccent,
              title: 'create a patent',
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: ((context) => createjob())));
              }),
        ],
      ),
      bottomNavigationBar: bar(),
    );
  }
}
