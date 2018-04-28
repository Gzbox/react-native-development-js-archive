import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class MutiRowText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            measured: false,
            shouldShowReadMore: false,
            showAllText: false,
        }
    }

    async componentDidMount() {
        await nextFrameAsync();

        // Get the height of the text with no restriction on number of lines
        const fullHeight = await measureHeightAsync(this._text);
        this.setState({ measured: true });
        await nextFrameAsync();

        // Get the height of the text now that number of lines has been set
        const limitedHeight = await measureHeightAsync(this._text);

        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true }, () => {
                this.props.onReady && this.props.onReady();
            });
        }
    }

    render() {
        let { measured, showAllText } = this.state;
        let { numberOfLines } = this.props;
        return (
            <View>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    ref={text => { this._text = text; }}>
                    {this.props.children}
                </Text>
                {this.maybeRenderReadMore()}
            </View>
        );
    }

    handlePressReadMore = () => {
        this.setState({ showAllText: true });
    }

    handlePressReadLess = () => {
        this.setState({ showAllText: false });
    }

    maybeRenderReadMore = () => {
        let { shouldShowReadMore, showAllText } = this.state;
        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this.handlePressReadMore);
            }
            return (
                <Text style={styles.button} onPress={this.handlePressReadMore}>
                    ...全文
              </Text>
            )
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this.handlePressReadLess);
            }
            return (
                <Text style={styles.button} onPress={this.handlePressReadLess}>
                    收起
              </Text>
            );
        }
    }
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        color: '#3088FF',
        fontSize: 14,
        bottom: 0,
        right: 13,
        backgroundColor: '#fff',
        width: 45,
        textAlign: 'right',
        lineHeight: 21,
    },
});
